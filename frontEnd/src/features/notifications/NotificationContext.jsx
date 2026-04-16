import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { getToken } from "../../lib/auth";
import { webSocketService } from "../../services/WebSocketService";

const NOTIFICATION_ICONS = {
  booking_request: "🚗",
  booking_approved: "✅",
  booking_rejected: "❌",
  booking_cancelled: "🚫",
  rental_started: "🔑",
  rental_completed: "🏁",
  payment: "💳",
  review: "⭐",
  verification: "🪪",
  default: "🔔",
};

function getIcon(type) {
  return NOTIFICATION_ICONS[type] ?? NOTIFICATION_ICONS.default;
}

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [connected, setConnected] = useState(false);

  // ── state helpers ─────────────────────────────────────────────────────────
  const addNotification = useCallback((notification) => {
    setNotifications((prev) => [notification, ...prev]);
    if (!notification.is_read) setUnreadCount((c) => c + 1);
  }, []);

  const markRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.notification_id === id ? { ...n, is_read: true } : n))
    );
    setUnreadCount((c) => Math.max(0, c - 1));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnreadCount(0);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => {
      const target = prev.find((n) => n.notification_id === id);
      if (target && !target.is_read) setUnreadCount((c) => Math.max(0, c - 1));
      return prev.filter((n) => n.notification_id !== id);
    });
  }, []);

  // ── keep the notification handler in a ref so the same function identity
  //    is reused across polling ticks — prevents duplicate registrations ─────
  const handlerRef = useRef(null);
  useEffect(() => {
    handlerRef.current = (notification) => {
      addNotification(notification);
      toast(notification.message, {
        icon: getIcon(notification.type),
        duration: 5000,
        description: new Date(notification.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    };
  }, [addNotification]);

  // ── wire the singleton service to React state ─────────────────────────────
  useEffect(() => {
    function subscribe() {
      webSocketService.subscribeNotifications(
        handlerRef.current,
        () => setConnected(true)
      );
    }

    // initial connection attempt (only if a token already exists at mount)
    if (getToken()) subscribe();

    const interval = setInterval(() => {
      // keep the connected badge in sync
      setConnected(webSocketService.connected);

      // re-subscribe after login: token appeared but no subscription yet
      if (getToken() && !webSocketService.hasActiveSubscription) {
        subscribe();
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      // only unsubscribe the listener — don't call disconnect() here;
      // that is the navbars' job on explicit logout
      webSocketService.unsubscribeNotifications();
      setConnected(false);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — runs once; polling handles re-subscribe

  const value = {
    notifications,
    unreadCount,
    connected,
    markRead,
    markAllRead,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error(
      "useNotificationContext must be used inside <NotificationProvider>"
    );
  }
  return ctx;
}
