import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

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

          <div className="pageHeader">
            <h1>Notifications</h1>

            <button
              className="dangerBtn"
              onClick={clearAll}
            >
              Clear All
            </button>
          </div>

          <div className="cardBox">

            {notifications.length === 0 ? (
              <p>No notifications</p>
            ) : (
              notifications.map((n, i) => (
                <div key={i} className="notifyCard">
                  {n}
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