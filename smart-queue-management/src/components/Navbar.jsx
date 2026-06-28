import { useContext, useState, useEffect } from "react";
import {
  FaMoon,
  FaSun,
  FaBell,
  FaUserCircle,
  FaSearch
} from "react-icons/fa";

import { ThemeContext } from "../context/ThemeContext";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { query, setQuery } = useContext(SearchContext);
  const { user, login, logout } = useContext(AuthContext);

  const [showProfile, setShowProfile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (!username.trim()) return;

    login(username);
    setUsername("");
    setShowLogin(false);
  };

  return (
    <header className="navbar">

      {/* SEARCH */}
      <div className="searchBox">
        <FaSearch />
        <input
          placeholder="Search tokens..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* RIGHT */}
      <div className="navRight">

        {/* THEME */}
        <button className="circleBtn" onClick={toggleTheme}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        {/* PROFILE */}
        <div className="iconWrapper">

          <FaUserCircle
            className="icon"
            onClick={() => setShowProfile(!showProfile)}
          />

          {showProfile && (
            <div className="dropdown profileDropdown">

              {user ? (
                <>
                  <p className="profileName">
                    👤 {user.username}
                  </p>

                  <button onClick={toggleTheme}>
                    Toggle Theme
                  </button>

                  <button
                    onClick={() =>
                      (window.location.href = "/settings")
                    }
                  >
                    Settings
                  </button>

                  <button onClick={logout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <p className="profileName">
                    Not logged in
                  </p>

                  <button
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </button>
                </>
              )}

            </div>
          )}

        </div>

      </div>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="modalOverlay">

          <div className="modalBox">

            <h3>Login</h3>

            <input
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <div className="modalActions">

              <button onClick={handleLogin}>
                Login
              </button>

              <button
                className="cancelBtn"
                onClick={() => setShowLogin(false)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </header>
  );
}

export default Navbar;