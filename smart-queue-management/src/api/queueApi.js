const BASE_URL = "http://localhost:5000/api/queue";

// CREATE TOKEN
export const createToken = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await res.json();
};

// GET ALL TOKENS
export const getQueue = async () => {
  const res = await fetch(BASE_URL);
  return await res.json();
};

// UPDATE STATUS
export const updateStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  return await res.json();
};

// DELETE TOKEN
export const deleteToken = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return await res.json();
};