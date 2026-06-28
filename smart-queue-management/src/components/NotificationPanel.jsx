import { useEffect, useState } from "react";

function NotificationPanel() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const load = () => {
      const data =
        JSON.parse(localStorage.getItem("notifications")) || [];

      setNotifications(data);
    };

    load();

    const interval = setInterval(load, 1000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="notificationCard">

      <h2>Notifications</h2>

      {notifications.length === 0 ? (

        <p>No notifications available.</p>

      ) : (

        notifications.map((item, index) => (

          <div
            key={index}
            className="notificationItem"
          >
            🔔 {item}
          </div>

        ))

      )}

    </div>

  );

}

export default NotificationPanel;