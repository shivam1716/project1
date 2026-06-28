import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { getNextToken } from "../utils/queueEngine";

function CounterBoard() {
  const [queue, setQueue] = useState([]);

  const [counters, setCounters] = useState([
    { id: 1, current: null },
    { id: 2, current: null },
    { id: 3, current: null },
  ]);

  // Load queue
  const loadQueue = () => {
    const data = JSON.parse(localStorage.getItem("queue")) || [];
    setQueue(data);
  };

  useEffect(() => {
    loadQueue();

    const interval = setInterval(loadQueue, 1000);
    return () => clearInterval(interval);
  }, []);

  const saveQueue = (updated) => {
    localStorage.setItem("queue", JSON.stringify(updated));
    setQueue(updated);
  };

  // -----------------------------
  // SERVE NEXT TOKEN (FIXED)
  // -----------------------------
  const serveNext = (counterId) => {
    const next = getNextToken(queue);

    if (!next) return;

    // Prevent same token being served twice
    const alreadyServing = counters.some(
      (c) => c.current === next.token
    );

    if (alreadyServing) return;

    // Update queue status → Serving
    const updatedQueue = queue.map((item) =>
      item.token === next.token
        ? { ...item, status: "Serving", counterId }
        : item
    );

    // Assign to counter
    const updatedCounters = counters.map((c) =>
      c.id === counterId
        ? { ...c, current: next.token }
        : c
    );

    setCounters(updatedCounters);
    saveQueue(updatedQueue);
  };

  // -----------------------------
  // COMPLETE TOKEN (FIXED)
  // -----------------------------
  const completeCurrent = (counterId) => {
    const counter = counters.find(
      (c) => c.id === counterId
    );

    if (!counter.current) return;

    const updatedQueue = queue.map((item) =>
      item.token === counter.current
        ? { ...item, status: "Completed" }
        : item
    );

    const updatedCounters = counters.map((c) =>
      c.id === counterId
        ? { ...c, current: null }
        : c
    );

    setCounters(updatedCounters);
    saveQueue(updatedQueue);
  };

  // -----------------------------
  // SKIP / CANCEL CURRENT TOKEN
  // -----------------------------
  const cancelCurrent = (counterId) => {
    const counter = counters.find(
      (c) => c.id === counterId
    );

    if (!counter.current) return;

    const updatedQueue = queue.map((item) =>
      item.token === counter.current
        ? { ...item, status: "Cancelled" }
        : item
    );

    const updatedCounters = counters.map((c) =>
      c.id === counterId
        ? { ...c, current: null }
        : c
    );

    setCounters(updatedCounters);
    saveQueue(updatedQueue);
  };

  return (
    <div className="layout">

      <Sidebar />

      <main className="main">

        <Navbar />

        <div className="content">

          <h1 className="pageTitle">
            Counter Management
          </h1>

          <div className="counterGrid">

            {counters.map((counter) => (

              <div
                key={counter.id}
                className="counterCard"
              >

                <h2>Counter {counter.id}</h2>

                <p className="counterToken">
                  {counter.current || "Idle"}
                </p>

                <div className="counterBtns">

                  <button
                    className="serveBtn"
                    onClick={() =>
                      serveNext(counter.id)
                    }
                    disabled={counter.current !== null}
                  >
                    Serve Next
                  </button>

                  <button
                    className="doneBtn"
                    onClick={() =>
                      completeCurrent(counter.id)
                    }
                    disabled={!counter.current}
                  >
                    Complete
                  </button>

                  <button
                    className="cancelBtn"
                    onClick={() =>
                      cancelCurrent(counter.id)
                    }
                    disabled={!counter.current}
                  >
                    Cancel
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  );
}

export default CounterBoard;