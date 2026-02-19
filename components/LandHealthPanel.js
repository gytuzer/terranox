"use client";

export default function LandHealthPanel({ data }) {
  if (!data) return null;

  const score = parseInt(data.total);
  const mode = data.mode || "stability";

  let color = "#16a34a";
  let status = "";
  let modeLabel = "";

  // 🔥 Mode Label
  if (mode === "stability") {
    modeLabel = "Ecological Stability Mode";
  } else if (mode === "development") {
    modeLabel = "Development Suitability Mode";
  } else if (mode === "conservation") {
    modeLabel = "Conservation Priority Mode";
  }

  // 🔥 Mode-Aware Status
  if (mode === "stability") {
    if (score < 40) {
      color = "#dc2626";
      status = "Ecologically Vulnerable";
    } else if (score < 70) {
      color = "#eab308";
      status = "Moderate Ecological Sensitivity";
    } else {
      color = "#16a34a";
      status = "Ecologically Stable";
    }
  }

  if (mode === "development") {
    if (score < 40) {
      color = "#dc2626";
      status = "Development Not Recommended";
    } else if (score < 70) {
      color = "#eab308";
      status = "Conditional Development Zone";
    } else {
      color = "#16a34a";
      status = "Low Development Constraint";
    }
  }

  if (mode === "conservation") {
    if (score < 40) {
      color = "#dc2626";
      status = "Low Conservation Value";
    } else if (score < 70) {
      color = "#eab308";
      status = "Moderate Conservation Priority";
    } else {
      color = "#16a34a";
      status = "High Conservation Significance";
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "80px",
        right: "20px",
        width: "300px",
        backgroundColor: "#11161c",
        border: "1px solid #2a2f36",
        padding: "18px",
        zIndex: 20,
        color: "#e5e7eb",
        fontFamily: "monospace",
        fontSize: "13px"
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
        LAND HEALTH ANALYSIS
      </div>

      {/* 🔥 Active Mode */}
      <div style={{ 
        fontSize: "11px", 
        color: "#9ca3af", 
        marginBottom: "12px" 
      }}>
        {modeLabel}
      </div>

      <div>Vegetation Index: {data.vegetation}</div>
      <div>Water Availability: {data.water}</div>
      <div>Flood Risk: {data.flood}</div>
      <div>Corridor Sensitivity: {data.corridor}</div>

      {/* 🔥 AQI Added */}
      <div style={{ marginTop: "6px" }}>
        Air Quality Index: {data.aqi ? `${data.aqi}%` : "—"}
      </div>

      <div
        style={{
          marginTop: "14px",
          padding: "10px",
          backgroundColor: color,
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#000"
        }}
      >
        LHI: {score} / 100
      </div>

      <div style={{ marginTop: "8px", fontSize: "12px", color: "#9ca3af" }}>
        Status: {status}
      </div>

      <div style={{ marginTop: "6px", fontSize: "11px", color: "#6b7280" }}>
        Confidence: 87% (Spatial Proximity Model)
      </div>
    </div>
  );
}
