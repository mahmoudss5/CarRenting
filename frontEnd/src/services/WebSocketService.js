import * as signalR from "@microsoft/signalr";
import { getToken } from "../lib/auth";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

class WebSocketService {
  constructor() {
    this._connection = null;
    this._connected = false;

    // queued callbacks waiting for the connection to be ready
    this._pendingCallbacks = [];

    // ── stored handlers — kept alive across disconnects/reconnects ────────
    this._notificationHandler = null;

    // reconnect scheduler
    this._reconnectTimer = null;
  }

  // ── token read fresh every time, never captured at startup ───────────────
  _getToken() {
    return getToken() ?? "";
  }

  // ── build the SignalR connection (pure WebSocket, no HTTP negotiate) ──────
  _createConnection() {
    this._connection = new signalR.HubConnectionBuilder()
      .withUrl(`${BASE_URL}/hubs/notifications`, {
        // always read the latest token (handles token refresh / re-login)
        accessTokenFactory: () => this._getToken(),
        // force pure WebSocket transport — skip the HTTP /negotiate step
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true,
      })
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    this._connection.onclose(() => {
      console.log("❌ WebSocket disconnected");
      this._connected = false;
      // schedule reconnect — only if the user is still authenticated
      this._reconnectTimer = setTimeout(() => {
        if (this._getToken()) {
          this._startConnection();
        }
      }, 5000);
    });
  }

  // ── starts the connection and drains the pending-callback queue ───────────
  _startConnection() {
    clearTimeout(this._reconnectTimer);

    if (!this._connection) {
      this._createConnection();
    }

    this._connection
      .start()
      .then(() => {
        console.log("✅ WebSocket connected");
        this._connected = true;

        // restore all subscriptions after every connect / reconnect
        this._resubscribeAll();

        // drain callbacks that were queued before the connection was ready
        const queued = [...this._pendingCallbacks];
        this._pendingCallbacks = [];
        queued.forEach((cb) => cb());
      })
      .catch((err) => {
        console.warn("WebSocket connection failed, retrying in 5 s…", err);
        this._reconnectTimer = setTimeout(() => {
          if (this._getToken()) this._startConnection();
        }, 5000);
      });
  }

  // ── re-registers every stored handler after a (re)connect ────────────────
  _resubscribeAll() {
    if (!this._connection) return;

    if (this._notificationHandler) {
      // remove stale listener first to avoid duplicates
      this._connection.off("ReceiveNotification");
      this._connection.on("ReceiveNotification", this._notificationHandler);
    }
  }

  // ── calls onReady immediately if connected, otherwise queues it ───────────
  _ensureConnected(onReady) {
    if (this._connected) {
      onReady();
      return;
    }

    this._pendingCallbacks.push(onReady);

    // only create the connection once — even if called several times
    // before the first connect completes
    if (!this._connection) {
      this._createConnection();
    }

    if (
      this._connection.state === signalR.HubConnectionState.Disconnected
    ) {
      this._startConnection();
    }
  }

  // ── NOTIFICATIONS ─────────────────────────────────────────────────────────

  /**
   * Subscribe to incoming notifications.
   * Safe to call before the connection is ready — the handler is stored and
   * resubscribed automatically after every connect / reconnect.
   * Also safe to call while already connected — immediately re-registers
   * the updated handler without duplicates.
    *
   * @param {(notification: object) => void} onNotification
   * @param {() => void} [onConnected]   optional callback fired once connected
   */
  subscribeNotifications(onNotification, onConnected) {
    this._notificationHandler = onNotification;

    if (this._connected) {
      // already live — just (re-)register and signal immediately
      this._resubscribeAll();
      if (onConnected) onConnected();
      return;
    }

    this._ensureConnected(() => {
      if (onConnected) onConnected();
    });
  }

  unsubscribeNotifications() {
    if (this._connection) {
      this._connection.off("ReceiveNotification");
    }
    this._notificationHandler = null;
  }

  // ── tear down completely (call on logout) ─────────────────────────────────
  disconnect() {
    clearTimeout(this._reconnectTimer);
    this.unsubscribeNotifications();
    if (this._connection) {
      this._connection.stop();
    }
    this._connection = null;
    this._connected = false;
    this._pendingCallbacks = [];
  }

  /** true when a notification handler is registered (even if not yet connected) */
  get hasActiveSubscription() {
    return this._notificationHandler !== null;
  }

  get connected() {
    return this._connected;
  }
}

// ── singleton — one shared instance for the whole app ────────────────────────
export const webSocketService = new WebSocketService();
