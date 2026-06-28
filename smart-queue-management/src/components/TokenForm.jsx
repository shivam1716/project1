import { useState } from "react";

function TokenForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState("Normal");
  const [token, setToken] = useState("");

  const generateToken = () => {
    if (!name.trim()) {
      alert("Please enter patient name.");
      return;
    }

    const queue = JSON.parse(localStorage.getItem("queue")) || [];

    // Generate next token number
    let nextNumber = 1;

    if (queue.length > 0) {
      const numbers = queue.map((item) =>
        parseInt(item.token.replace("A", ""))
      );

      nextNumber = Math.max(...numbers) + 1;
    }

    const newToken = "A" + String(nextNumber).padStart(3, "0");

    const newPatient = {
      token: newToken,
      name,
      priority: type,
      status: "Waiting",
      createdAt: new Date().toISOString(),
    };

    queue.push(newPatient);

    localStorage.setItem("queue", JSON.stringify(queue));

    // Add notification
    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    notifications.unshift(
      `${newToken} generated for ${name}`
    );

    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications.slice(0, 10))
    );

    setToken(newToken);
    setName("");
    setType("Normal");
  };

  return (
    <div className="formCard">
      <div className="formGroup">
        <label>Patient Name</label>

        <input
          value={name}
          placeholder="Enter patient name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="formGroup">
        <label>Priority</label>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Normal</option>
          <option>VIP</option>
          <option>Emergency</option>
        </select>
      </div>

      <button
        className="primaryBtn"
        onClick={generateToken}
      >
        Generate Token
      </button>

      {token && (
        <div className="tokenCard">
          <h3>Your Token</h3>
          <h1>{token}</h1>
        </div>
      )}
    </div>
  );
}

export default TokenForm;