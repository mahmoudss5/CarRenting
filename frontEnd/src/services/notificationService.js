import apiClient from "../lib/apiClient";

/**
 * GET /api/notifications  [Requires Auth]
 * Get all notifications for the logged-in user.
 */
export async function getNotifications() {
  const { data } = await apiClient.get("/api/notifications");
  return data;
  // { notifications: [{ notification_id, type, message, is_read, created_at }],
  //   unread_count, total }
}

/**
 * PATCH /api/notifications/:id/read  [Requires Auth]
 * Mark a single notification as read.
 */
export async function markNotificationRead(id) {
  const { data } = await apiClient.patch(`/api/notifications/${id}/read`);
  return data;
}

/**
 * PATCH /api/notifications/read-all  [Requires Auth]
 * Mark all notifications as read.
 */
export async function markAllNotificationsRead() {
  const { data } = await apiClient.patch("/api/notifications/read-all");
  return data;
}

/**
 * GET /api/notifications/unread-count  [Requires Auth]
 * Get the count of unread notifications.
 */
export async function getUnreadCount() {
  const { data } = await apiClient.get("/api/notifications/unread-count");
  return data; // number or { count: number }
}

/**
 * DELETE /api/notifications/:id  [Requires Auth]
 * Delete a notification.
 */
export async function deleteNotification(id) {
  const { data } = await apiClient.delete(`/api/notifications/${id}`);
  return data;
}
