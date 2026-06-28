import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function Analytics() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const loadQueue = () => {
      const data = JSON.parse(localStorage.getItem("queue")) || [];
      setQueue(data);
    };

    loadQueue();

    const interval = setInterval(loadQueue, 1000);

    return () => clearInterval(interval);
  }, []);

  const getCount = (status) =>
    queue.filter((item) => item.status === status).length;

  const pieData = [
    {
      name: "Waiting",
      value: getCount("Waiting"),
    },
    {
      name: "Serving",
      value: getCount("Serving"),
    },
    {
      name: "Completed",
      value: getCount("Completed"),
    },
    {
      name: "Cancelled",
      value: getCount("Cancelled"),
    },
  ];

  const COLORS = [
    "#f59e0b",
    "#10b981",
    "#3b82f6",
    "#ef4444",
  ];

  // Demo weekly data
  const lineData = [
    { day: "Mon", tokens: 22 },
    { day: "Tue", tokens: 35 },
    { day: "Wed", tokens: 28 },
    { day: "Thu", tokens: 40 },
    { day: "Fri", tokens: 52 },
    { day: "Sat", tokens: 31 },
    { day: "Sun", tokens: 45 },
  ];

  return (
    <div className="layout">

      <Sidebar />

      <main className="main">

        <Navbar />

        <div className="content">

          <h1 className="pageTitle">
            Analytics Dashboard
          </h1>

          <div className="chartGrid">

            {/* Pie Chart */}

            <div className="chartCard">

              <h3>Queue Status Distribution</h3>

              <ResponsiveContainer
                width="100%"
                height={320}
              >

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={110}
                    label
                  >

                    {pieData.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />

                    ))}

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

            {/* Line Chart */}

            <div className="chartCard">

              <h3>Weekly Token Flow</h3>

              <ResponsiveContainer
                width="100%"
                height={320}
              >

                <LineChart data={lineData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis dataKey="day" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="tokens"
                    stroke="#4f46e5"
                    strokeWidth={4}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* Statistics */}

          <div
            className="cards"
            style={{ marginTop: "30px" }}
          >

            <div className="card">

              <h3>Total Tokens</h3>

              <h1>{queue.length}</h1>

            </div>

            <div className="card">

              <h3>Waiting</h3>

              <h1>{getCount("Waiting")}</h1>

            </div>

            <div className="card">

              <h3>Serving</h3>

              <h1>{getCount("Serving")}</h1>

            </div>

            <div className="card">

              <h3>Completed</h3>

              <h1>{getCount("Completed")}</h1>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Analytics;