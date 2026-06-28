export const getQueue = () => {
  return JSON.parse(localStorage.getItem("queue")) || [];
};

export const saveQueue = (queue) => {
  localStorage.setItem("queue", JSON.stringify(queue));
};