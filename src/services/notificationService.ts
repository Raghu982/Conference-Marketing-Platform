export type Notification = {
  id: number;
  message: string;
  createdAt: string;
  read: boolean;
};

const STORAGE_KEY =
  "notifications";

export const notificationService = {
  getAll(): Notification[] {
    const data =
      localStorage.getItem(
        STORAGE_KEY
      );

    return data
      ? JSON.parse(data)
      : [];
  },

  add(message: string) {
    const notifications =
      this.getAll();

    notifications.unshift({
      id: Date.now(),
      message,
      createdAt:
        new Date().toLocaleString(),
      read: false,
    });

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        notifications
      )
    );
  },

  markAllRead() {
    const notifications =
      this.getAll();

    notifications.forEach(
      (n) => (n.read = true)
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        notifications
      )
    );
  },

  unreadCount() {
    return this.getAll().filter(
      (n) => !n.read
    ).length;
  },
};