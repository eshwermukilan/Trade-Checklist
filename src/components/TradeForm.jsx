import { useState } from "react";

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbwY2BF4b1Xf55F6hUAXSJzw7tYxBnJbjxw5QxDYo_18zc_1QOVJ4KoM-SYIbxPKHaEoaw/exec";

export default function TradeForm() {
  const [saved, setSaved] = useState(false);    
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    tradeName: "",
    date: new Date().toISOString().split("T")[0],
    pair: "",
    bias4h: "YES",
    immediateBias: "YES",
    liquidity: "YES",
    markPoi: "YES",
    poiMitigated: "YES",
    lqSweep: "YES",
    ltfMs: "YES",
    entry: "YES",
    result: "WIN",
  });

  const checklistItems = [
    ["4H Bias", "bias4h"],
    ["Immediate Bias", "immediateBias"],
    ["Liquidity", "liquidity"],
    ["Mark POI", "markPoi"],
    ["POI Mitigated", "poiMitigated"],
    ["LQ Sweep", "lqSweep"],
    ["LTF MS", "ltfMs"],
    ["Entry", "entry"],
  ];

  const score = checklistItems.filter(
    ([_, key]) => formData[key] === "YES"
  ).length;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const submitTrade = async () => {

  if (!formData.tradeName.trim()) {
    setError("⚠️ Trade Name is required");
    return;
  }

  if (!formData.pair.trim()) {
    setError("⚠️ Pair is required");
    return;
  }

  setError("");

  try {

    await fetch(WEB_APP_URL, {
      method: "POST",
      body: JSON.stringify(formData),
    });

    alert("✅ Trade Saved Successfully");

    setFormData({
      tradeName: "",
      date: new Date().toISOString().split("T")[0],
      pair: "",
      bias4h: "YES",
      immediateBias: "YES",
      liquidity: "YES",
      markPoi: "YES",
      poiMitigated: "YES",
      lqSweep: "YES",
      ltfMs: "YES",
      entry: "YES",
      result: "WIN",
    });

  } catch (err) {
    alert("❌ Error Saving Trade");
    console.error(err);
  }
};

  return (
    <>
      {saved && (
        <div className="toast">
          🚀 Trade Saved Successfully
        </div>
      )}

      <div className="form-card">

        <div className="dashboard-title">
          <h2><strong>Checklist Dashboard</strong></h2>
          <p>Review every executed trade</p>
        </div>

        <div className="top-grid">

          <input
            type="text"
            name="tradeName"
            placeholder="Trade Name"
            value={formData.tradeName}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <input
            type="text"
            name="pair"
            placeholder="Pair (XAUUSD)"
            value={formData.pair}
            onChange={handleChange}
          />

        </div>

        <div className="score-card">
          <h2>{score}/8</h2>

          <span>
            {score === 8
              ? "Perfect Setup 🔥"
              : score >= 6
              ? "A Grade Setup ✅"
              : score >= 4
              ? "Average Setup ⚠️"
              : "Poor Setup ❌"}
          </span>
        </div>

        <div className="checklist-grid">

          {checklistItems.map(([label, key]) => (
            <div className="check-card" key={key}>

              <span>{label}</span>

              <div className="toggle-group">

                <button
                  type="button"
                  className={
                    formData[key] === "YES"
                      ? "active-yes"
                      : ""
                  }
                  onClick={() =>
                    setFormData({
                      ...formData,
                      [key]: "YES",
                    })
                  }
                >
                  ✅
                </button>

                <button
                  type="button"
                  className={
                    formData[key] === "NO"
                      ? "active-no"
                      : ""
                  }
                  onClick={() =>
                    setFormData({
                      ...formData,
                      [key]: "NO",
                    })
                  }
                >
                  ❌
                </button>

              </div>

            </div>
          ))}

        </div>

        <h3
          style={{
            marginTop: "30px",
            marginBottom: "15px",
          }}
        >
          Trade Result
        </h3>

        <div className="result-grid">

          {["WIN", "LOSS", "BE"].map((item) => (
            <div
              key={item}
              className={
                formData.result === item
                  ? "result-card active-result"
                  : "result-card"
              }
              onClick={() =>
                setFormData({
                  ...formData,
                  result: item,
                })
              }
            >
              {item}
            </div>
          ))}

        </div>
        {error && (
  <div className="error-box">
    {error}
  </div>
)}
        <button
          className="save-btn"
          onClick={submitTrade}
        >
          🚀 Save Trade
        </button>

      </div>
    </>
  );
}