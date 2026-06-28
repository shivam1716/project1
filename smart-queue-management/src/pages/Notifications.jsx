import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  // LOAD NOTIFICATIONS
  const load = () => {
    const data =
      JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(data);
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 1000);
    return () => clearInterval(interval);
  }, []);

  // DELETE SINGLE NOTIFICATION
  const deleteItem = (index) => {
    const updated = notifications.filter((_, i) => i !== index);

    localStorage.setItem(
      "notifications",
      JSON.stringify(updated)
    );

    setNotifications(updated);
  };

  // CLEAR ALL
  const clearAll = () => {
    localStorage.removeItem("notifications");
    setNotifications([]);
  };

  return (
    <div className="layout">

      <Sidebar />

      <main className="main">

        <Navbar />

        <div className="content">

          {/* HEADER */}
          <div className="pageHeader">
            <h1>Notifications</h1>

            <button
              className="dangerBtn"
              onClick={clearAll}
            >
              Clear All
            </button>
          </div>

          {/* NOTIFICATION GRID */}
          <div className="notificationGrid">

            {notifications.length === 0 ? (
              <div className="emptyState">
                No notifications found
              </div>
            ) : (
              notifications.map((n, i) => (
                <div key={i} className="notificationCard">

                  <div className="notificationContent">

                    <p className="notificationText">
                      {n}
                    </p>

                    {/* optional timestamp */}
                    <span className="notificationTime">
                      just now
                    </span>

                  </div>

                  <button
                    className="deleteBtn small"
                    onClick={() => deleteItem(i)}
                  >
                    Delete
                  </button>

                </div>
              ))
            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Notifications;