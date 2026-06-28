import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Dashboard from "./pages/Dashboard";
import GenerateToken from "./pages/GenerateToken";
import QueueStatus from "./pages/QueueStatus";
import Analytics from "./pages/Analytics";
import CounterBoard from "./components/CounterBoard";
import Actions from "./pages/Actions";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">

      <Routes location={location} key={location.pathname}>

        <Route
          path="/"
          element={<PageWrapper><Dashboard /></PageWrapper>}
        />

        <Route
          path="/generate"
          element={<PageWrapper><GenerateToken /></PageWrapper>}
        />

        <Route
          path="/queue"
          element={<PageWrapper><QueueStatus /></PageWrapper>}
        />

        <Route
          path="/analytics"
          element={<PageWrapper><Analytics /></PageWrapper>}
        />

        <Route
          path="/counters"
          element={<PageWrapper><CounterBoard /></PageWrapper>}
        />

        {/* ✅ ACTIONS */}
        <Route
          path="/actions"
          element={<PageWrapper><Actions /></PageWrapper>}
        />

        {/* ✅ NOTIFICATIONS */}
        <Route
          path="/notifications"
          element={<PageWrapper><Notifications /></PageWrapper>}
        />

        {/* ✅ SETTINGS */}
        <Route
          path="/settings"
          element={<PageWrapper><Settings /></PageWrapper>}
        />

      </Routes>

    </AnimatePresence>
  );
}

export default App;