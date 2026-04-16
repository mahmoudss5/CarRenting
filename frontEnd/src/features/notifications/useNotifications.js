import { useCallback } from "react";
import { useNotificationContext } from "./NotificationContext";
import {
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  getNotifications,
} from "../../services/notificationService";

/**
 * Extends the raw notification context with server-synced actions.
 * Components should import this hook instead of useNotificationContext directly.
 */
export function useNotifications() {
  const ctx = useNotificationContext();

  const handleMarkRead = useCallback(
    async (id) => {
      ctx.markRead(id);
      try {
        await markNotificationRead(id);
      } catch {
        // optimistic update already applied; silently swallow the error
      }
    },
    [ctx]
  );

  const handleMarkAllRead = useCallback(async () => {
    ctx.markAllRead();
    try {
      await markAllNotificationsRead();
    } catch {
      // ignore
    }
  }, [ctx]);

  const handleDelete = useCallback(
    async (id) => {
      ctx.removeNotification(id);
      try {
        await deleteNotification(id);
      } catch {
        // ignore
      }
    },
    [ctx]
  );

  const fetchHistory = useCallback(async () => {
    try {
      const data = await getNotifications();
      return data;
    } catch {
      return null;
    }
  }, []);

  return {
    notifications: ctx.notifications,
    unreadCount: ctx.unreadCount,
    connected: ctx.connected,
    markRead: handleMarkRead,
    markAllRead: handleMarkAllRead,
    deleteNotification: handleDelete,
    fetchHistory,
  };
}
