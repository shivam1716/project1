import { useEffect, useState } from "react";
import { FaUsers, FaClock, FaCheckCircle, FaPlayCircle } from "react-icons/fa";
import { getQueueStats } from "../utils/queueStats";

function DashboardCards() {
  const [stats, setStats] = useState(getQueueStats());

  useEffect(() => {
    const loadStats = () => {
      setStats(getQueueStats());
    };

    loadStats();

    const interval = setInterval(loadStats, 1000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: "Total Tokens",
      value: stats.total,
      icon: <FaUsers />,
      color: "#4f46e5"
    },
    {
      title: "Waiting",
      value: stats.waiting,
      icon: <FaClock />,
      color: "#f59e0b"
    },
    {
      title: "Serving",
      value: stats.serving,
      icon: <FaPlayCircle />,
      color: "#10b981"
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: <FaCheckCircle />,
      color: "#3b82f6"
    }
  ];

  return (
    <div className="cards">
      {cards.map((card) => (
        <div className="card" key={card.title}>
          <div className="cardTop">
            <div
              className="cardIcon"
              style={{ background: card.color }}
            >
              {card.icon}
            </div>

            <div>
              <h3>{card.title}</h3>
              <h1>{card.value}</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;