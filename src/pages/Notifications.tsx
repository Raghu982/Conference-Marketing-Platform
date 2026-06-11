import {
  useEffect,
  useState,
} from "react";

import { notificationService } from "../services/notificationService";
import type { Notification } from "../services/notificationService";

export default function Notifications() {
  const [
    notifications,
    setNotifications,
  ] = useState<
    Notification[]
  >([]);

  const loadNotifications =
    () => {
      setNotifications(
        notificationService.getAll()
      );
    };

  useEffect(() => {
    loadNotifications();
  }, []);

  const markAllRead = () => {
    notificationService.markAllRead();

    loadNotifications();
  };

  return (
    <div className="p-6 text-white bg-slate-950 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">
          Notifications
        </h1>

        <button
          onClick={markAllRead}
          className="bg-cyan-500 px-4 py-2 rounded"
        >
          Mark All Read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map(
          (notification) => (
            <div
              key={
                notification.id
              }
              className={`p-4 rounded-lg ${
                notification.read
                  ? "bg-slate-800"
                  : "bg-cyan-900"
              }`}
            >
              <div>
                {
                  notification.message
                }
              </div>

              <div className="text-sm text-slate-400 mt-2">
                {
                  notification.createdAt
                }
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}