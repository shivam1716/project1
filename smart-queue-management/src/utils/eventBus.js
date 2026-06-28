const listeners = {};

export const emit = (event, data) => {
  if (!listeners[event]) return;
  listeners[event].forEach(cb => cb(data));
};

export const on = (event, callback) => {
  if (!listeners[event]) listeners[event] = [];
  listeners[event].push(callback);
};

export const off = (event, callback) => {
  if (!listeners[event]) return;
  listeners[event] = listeners[event].filter(cb => cb !== callback);
};