import { useEffect, useState, useContext } from "react";
import { SearchContext } from "../context/SearchContext";

function QueueTable() {
  const [queue, setQueue] = useState([]);
  const { query } = useContext(SearchContext);

  // ---------------------------
  // LOAD QUEUE FROM STORAGE
  // ---------------------------
  const loadQueue = () => {
    const data = JSON.parse(localStorage.getItem("queue")) || [];
    setQueue(data);
  };

  useEffect(() => {
    loadQueue();

    const interval = setInterval(loadQueue, 1000);
    return () => clearInterval(interval);
  }, []);

  // ---------------------------
  // NOTIFICATION HELPER
  // ---------------------------
  const addNotification = (message) => {
    const existing =
      JSON.parse(localStorage.getItem("notifications")) || [];

    const updated = [message, ...existing].slice(0, 10);

    localStorage.setItem(
      "notifications",
      JSON.stringify(updated)
    );
  };

  // ---------------------------
  // UPDATE STATUS
  // ---------------------------
  const updateStatus = (token, status) => {
    const updated = queue.map((item) =>
      item.token === token ? { ...item, status } : item
    );

    localStorage.setItem("queue", JSON.stringify(updated));
    setQueue(updated);

    // Notifications
    addNotification(`Token ${token} marked as ${status}`);
  };

  // ---------------------------
  // DELETE TOKEN
  // ---------------------------
  const deleteToken = (token) => {
    const updated = queue.filter(
      (item) => item.token !== token
    );

    localStorage.setItem("queue", JSON.stringify(updated));
    setQueue(updated);

    // Notifications
    addNotification(`Token ${token} deleted`);
  };

  // ---------------------------
  // SEARCH FILTER
  // ---------------------------
  const filteredQueue = queue.filter((item) => {
    const q = query.toLowerCase();

    return (
      item.token.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.status.toLowerCase().includes(q) ||
      item.priority.toLowerCase().includes(q)
    );
  });

  return (
    <div className="tableCard">

      <table className="queueTable">

        <thead>
          <tr>
            <th>Token</th>
            <th>Name</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredQueue.length === 0 ? (
            <tr>
              <td colSpan="5" className="noData">
                No results found
              </td>
            </tr>
          ) : (
            filteredQueue.map((item) => (
              <tr key={item.token}>

                <td className="tokenCell">
                  {item.token}
                </td>

                <td>{item.name}</td>

                <td>
                  <span
                    className={`priority ${item.priority.toLowerCase()}`}
                  >
                    {item.priority}
                  </span>
                </td>

                <td>
                  <span
                    className={`status ${item.status.toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="actions">

                  <button
                    className="serveBtn"
                    onClick={() =>
                      updateStatus(item.token, "Serving")
                    }
                  >
                    Serve
                  </button>

                  <button
                    className="doneBtn"
                    onClick={() =>
                      updateStatus(item.token, "Completed")
                    }
                  >
                    Complete
                  </button>

                  <button
                    className="cancelBtn"
                    onClick={() =>
                      updateStatus(item.token, "Cancelled")
                    }
                  >
                    Cancel
                  </button>

                  <button
                    className="deleteBtn"
                    onClick={() =>
                      deleteToken(item.token)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default QueueTable;