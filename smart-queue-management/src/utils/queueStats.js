export const getQueueStats = () => {
  const queue = JSON.parse(localStorage.getItem("queue")) || [];

  return {
    total: queue.length,
    waiting: queue.filter(q => q.status === "Waiting").length,
    serving: queue.filter(q => q.status === "Serving").length,
    completed: queue.filter(q => q.status === "Completed").length,
    cancelled: queue.filter(q => q.status === "Cancelled").length,
  };
};