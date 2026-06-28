import { emit } from "./eventBus";

export const addNotification = (message) => {
  const existing = JSON.parse(localStorage.getItem("notifications")) || [];

  const updated = [message, ...existing].slice(0, 10);

  localStorage.setItem("notifications", JSON.stringify(updated));

  emit("notify", updated);
};