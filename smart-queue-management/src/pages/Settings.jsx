import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { ThemeContext } from "../context/ThemeContext";

function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // RESET SYSTEM
  const resetSystem = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all data?"
    );

    if (!confirmReset) return;

    localStorage.removeItem("queue");
    localStorage.removeItem("notifications");

    alert("System reset successfully!");
  };

  return (
    <div className="layout">

      <Sidebar />

      <main className="main">

        <Navbar />

        <div className="content">

          {/* PAGE TITLE */}
          <div className="pageHeader">
            <h1>Settings</h1>
          </div>

          {/* SETTINGS GRID */}
          <div className="settingsGrid">

            {/* THEME SECTION */}
            <div className="settingsCard">

              <div className="cardHeader">
                <h3>Appearance</h3>
                <p>Manage app theme</p>
              </div>

              <div className="cardBody">

                <div className="settingRow">
                  <span>Current Theme</span>
                  <span className="badge">{theme}</span>
                </div>

                <button
                  className="primaryBtn fullWidthBtn"
                  onClick={toggleTheme}
                >
                  Toggle Theme
                </button>

              </div>

            </div>

            {/* SYSTEM SECTION */}
            <div className="settingsCard danger">

              <div className="cardHeader">
                <h3>System Control</h3>
                <p>Reset or clear all data</p>
              </div>

              <div className="cardBody">

                <div className="settingRow">
                  <span>Queue Data</span>
                  <span className="badge warning">LocalStorage</span>
                </div>

                <div className="settingRow">
                  <span>Notifications</span>
                  <span className="badge warning">Stored locally</span>
                </div>

                <button
                  className="dangerBtn fullWidthBtn"
                  onClick={resetSystem}
                >
                  Reset All Data
                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Settings;