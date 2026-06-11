import { useEffect, useState } from "react";
import axios from "axios";

export default function NotificationCenter() {
  const [notifications, setNotifications] =
    useState<any[]>([]);

  const API_URL =
    "http://localhost:5000/api/notifications";

  const fetchNotifications = async () => {
    try {
      const response =
        await axios.get(API_URL);

      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (
    id: number
  ) => {
    try {
      await axios.put(
        `${API_URL}/${id}/read`
      );

      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotification = async (
    id: number
  ) => {
    try {
      await axios.delete(
        `${API_URL}/${id}`
      );

      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const unreadCount =
    notifications.filter(
      (item) => !item.isRead
    ).length;

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Notifications
        </h2>

        <span className="bg-cyan-500 px-3 py-1 rounded-full text-sm font-bold">
          {unreadCount} Unread
        </span>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 && (
          <div className="text-slate-400">
            No notifications available
          </div>
        )}

        {notifications.map((item) => (
          <div
            key={item.id}
            className={`rounded-lg p-4 ${
              item.isRead
                ? "bg-slate-700"
                : "bg-cyan-900/30 border border-cyan-500"
            }`}
          >
            <h3 className="font-bold">
              {item.title}
            </h3>

            <p className="text-slate-300">
              {item.message}
            </p>

            <p className="text-sm text-slate-400 mt-1">
              {new Date(
                item.createdAt
              ).toLocaleString()}
            </p>

            <div className="mt-3 space-x-2">
              {!item.isRead && (
                <button
                  onClick={() =>
                    markAsRead(item.id)
                  }
                  className="bg-green-600 px-3 py-1 rounded"
                >
                  Mark Read
                </button>
              )}

              <button
                onClick={() =>
                  deleteNotification(item.id)
                }
                className="bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}