import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, BellDot, Check, CheckCheck, Trash2, Wifi, WifiOff } from "lucide-react";
import { useNotifications } from "../../features/notifications/useNotifications";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const TYPE_COLORS = {
  booking_request: "bg-blue-100 text-blue-700",
  booking_approved: "bg-green-100 text-green-700",
  booking_rejected: "bg-red-100 text-red-700",
  booking_cancelled: "bg-orange-100 text-orange-700",
  rental_started: "bg-indigo-100 text-indigo-700",
  rental_completed: "bg-teal-100 text-teal-700",
  payment: "bg-violet-100 text-violet-700",
  review: "bg-yellow-100 text-yellow-700",
  verification: "bg-sky-100 text-sky-700",
  default: "bg-surface-low text-on-surface/60",
};

function typeColor(type) {
  return TYPE_COLORS[type] ?? TYPE_COLORS.default;
}

export default function NotificationBell({ className = "" }) {
  const { notifications, unreadCount, connected, markRead, markAllRead, deleteNotification } =
    useNotifications();

  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
        className="relative w-9 h-9 rounded-full flex items-center justify-center text-on-surface/40 hover:text-primary hover:bg-surface-low transition-colors border-0 bg-transparent cursor-pointer"
      >
        {unreadCount > 0 ? (
          <BellDot size={19} strokeWidth={1.8} className="text-primary" />
        ) : (
          <Bell size={19} strokeWidth={1.8} />
        )}
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center leading-none">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-11 z-[200] w-[360px] rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.14)] border border-surface-dim overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-surface-dim">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-[0.95rem] text-on-surface">
                  Notifications
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    connected
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {connected ? (
                    <Wifi size={9} strokeWidth={2} />
                  ) : (
                    <WifiOff size={9} strokeWidth={2} />
                  )}
                  {connected ? "Live" : "Offline"}
                </span>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-[0.78rem] font-semibold text-primary hover:text-primary/80 transition-colors border-0 bg-transparent cursor-pointer"
                >
                  <CheckCheck size={13} strokeWidth={2} />
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <ul className="max-h-[380px] overflow-y-auto divide-y divide-surface-dim">
              {notifications.length === 0 ? (
                <li className="flex flex-col items-center justify-center py-10 gap-2 text-on-surface/40">
                  <Bell size={28} strokeWidth={1.4} />
                  <span className="font-body text-body-sm">No notifications yet</span>
                </li>
              ) : (
                notifications.map((n) => (
                  <li
                    key={n.notification_id}
                    className={`group flex gap-3 px-4 py-3 transition-colors ${
                      n.is_read ? "bg-white" : "bg-primary/[0.04]"
                    } hover:bg-surface-low`}
                  >
                    {/* unread dot */}
                    <div className="mt-1.5 flex-shrink-0 w-2 h-2">
                      {!n.is_read && (
                        <span className="block w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      {n.type && (
                        <span
                          className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded-full mb-1 ${typeColor(n.type)}`}
                        >
                          {n.type.replace(/_/g, " ")}
                        </span>
                      )}
                      <p
                        className={`font-body text-[0.83rem] leading-snug break-words ${
                          n.is_read ? "text-on-surface/60" : "text-on-surface font-medium"
                        }`}
                      >
                        {n.message}
                      </p>
                      <span className="text-[0.72rem] text-on-surface/40 mt-0.5 block">
                        {timeAgo(n.created_at)}
                      </span>
                    </div>

                    <div className="flex-shrink-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!n.is_read && (
                        <button
                          onClick={() => markRead(n.notification_id)}
                          title="Mark as read"
                          className="w-6 h-6 rounded-md flex items-center justify-center text-primary/60 hover:text-primary hover:bg-primary/10 transition-colors border-0 bg-transparent cursor-pointer"
                        >
                          <Check size={12} strokeWidth={2.5} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(n.notification_id)}
                        title="Delete"
                        className="w-6 h-6 rounded-md flex items-center justify-center text-on-surface/30 hover:text-red-500 hover:bg-red-50 transition-colors border-0 bg-transparent cursor-pointer"
                      >
                        <Trash2 size={12} strokeWidth={2} />
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
