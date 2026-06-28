import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import QueueTable from "../components/QueueTable";

function Actions() {
  return (
    <div className="layout">

      <Sidebar />

      <main className="main">

        <Navbar />

        <div className="content">

          <h1 className="pageTitle">
            Queue Actions
          </h1>

          <p style={{ color: "#6b7280", marginBottom: "20px" }}>
            Manage all queue operations in one place
          </p>

          <QueueTable />

        </div>

      </main>

    </div>
  );
}

export default Actions;