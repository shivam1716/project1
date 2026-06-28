import { emit } from "./eventBus";

export const getQueue = () =>
  JSON.parse(localStorage.getItem("queue")) || [];

export const saveQueue = (queue) => {
  localStorage.setItem("queue", JSON.stringify(queue));
  emit("queue-update", queue);
};

export const updateStatus = (token, status) => {
  const queue = getQueue();

  const updated = queue.map(item =>
    item.token === token ? { ...item, status } : item
  );

  saveQueue(updated);
};