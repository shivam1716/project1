import { Link, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaTicketAlt,
  FaUsers,
  FaHospital,
  FaBell,
  FaCog
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menu = [
    { title: "Dashboard", path: "/", icon: <FaChartPie /> },
    { title: "Generate Token", path: "/generate", icon: <FaTicketAlt /> },
    { title: "Queue Status", path: "/queue", icon: <FaUsers /> },
    { title: "Analytics", path: "/analytics", icon: <FaChartPie /> },
    { title: "Counters", path: "/counters", icon: <FaHospital /> },
    { title: "Actions", path: "/actions", icon: <FaCog /> },

    // ✅ WORKING SECTIONS
    { title: "Notifications", path: "/notifications", icon: <FaBell /> },
    { title: "Settings", path: "/settings", icon: <FaCog /> }
  ];

  return (
    <aside className="sidebar">

      <div className="logo">
        <FaHospital />
        <h2>QueueFlow</h2>
      </div>

      <nav className="menu">

        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.title}
              to={item.path}
              className={`menuItem ${isActive ? "active" : ""}`}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;