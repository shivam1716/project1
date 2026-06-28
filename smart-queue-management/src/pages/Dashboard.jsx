import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";

function Dashboard() {

  return (

    <div className="layout">

      <Sidebar />

      <main className="main">

        <Navbar />

        <div className="content">

          <div className="hero">

            <h1>
              Queue Management Dashboard
            </h1>

            <p>
              Monitor live queues, counters and analytics in real time.
            </p>

          </div>

          <DashboardCards />

        </div>

      </main>

    </div>

  );

}

export default Dashboard;