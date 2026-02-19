"use client";

export default function Legend() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "60px",
        right: "20px",
        backgroundColor: "#11161c",
        padding: "12px",
        border: "1px solid #2a2f36",
        color: "#e5e7eb",
        fontSize: "12px",
        zIndex: 20,
        fontFamily: "monospace"
      }}
    >
      <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
        INTENSITY SCALE
      </div>

      <div style={{ marginBottom: "8px" }}>
        Vegetation
        <div
          style={{
            width: "160px",
            height: "10px",
            background: "linear-gradient(to right, #14532d, #4ade80)",
            marginTop: "4px"
          }}
        />
      </div>

      <div style={{ marginBottom: "8px" }}>
        Water
        <div
          style={{
            width: "160px",
            height: "10px",
            background: "linear-gradient(to right, #1e3a8a, #93c5fd)",
            marginTop: "4px"
          }}
        />
      </div>

      <div>
        Flood Risk
        <div
          style={{
            width: "160px",
            height: "10px",
            background: "linear-gradient(to right, #f87171, #991b1b)",
            marginTop: "4px"
          }}
        />
      </div>
    </div>
  );
}
