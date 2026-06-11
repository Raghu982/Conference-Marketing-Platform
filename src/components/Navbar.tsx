import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { notificationService } from "../services/notificationService";

export default function Navbar() {
  const [unreadCount, setUnreadCount] =
    useState(0);

  useEffect(() => {
    const updateCount = () => {
      setUnreadCount(
        notificationService.unreadCount()
      );
    };

    updateCount();

    const interval =
      setInterval(updateCount, 1000);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6">
      <h2 className="font-semibold text-lg">
        Dashboard
      </h2>

      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search..."
          className="bg-slate-800 px-4 py-2 rounded-lg outline-none"
        />

        <Link
          to="/notifications"
          className="relative"
        >
          <button className="bg-slate-800 px-4 py-2 rounded-lg">
            🔔
          </button>

          {unreadCount > 0 && (
            <span
              className="
                absolute
                -top-2
                -right-2
                bg-red-500
                text-white
                text-xs
                rounded-full
                px-2
                py-1
              "
            >
              {unreadCount}
            </span>
          )}
        </Link>

        <button className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg font-semibold text-black">
          Add Conference
        </button>
      </div>
    </header>
  );
}