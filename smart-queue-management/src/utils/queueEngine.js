export const getNextToken = (queue) => {
  const priorityOrder = {
    Emergency: 1,
    VIP: 2,
    Normal: 3,
  };

  const waiting = queue.filter(q => q.status === "Waiting");

  waiting.sort(
    (a, b) =>
      priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return waiting.length > 0 ? waiting[0] : null;
};