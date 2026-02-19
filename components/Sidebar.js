"use client";

export default function Sidebar({ map }) {

  const toggleLayer = (layerId, visible) => {
    if (!map) return;
    if (!map.getLayer(layerId)) return;

    map.setLayoutProperty(
      layerId,
      "visibility",
      visible ? "visible" : "none"
    );
  };

  const changeMode = (mode) => {
    window.analysisMode = mode;

    if (window.setLandHealth) {
      window.setLandHealth((prev) => {
        if (!prev) {
          return {
            vegetation: "0.00",
            water: "0.00",
            flood: "0.00",
            corridor: "0.00",
            total: "50",
            mode: mode,
            recommendation: "Select a location"
          };
        }

        return {
          ...prev,
          mode: mode
        };
      });
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "300px",
        backgroundColor: "#11161c",
        borderRight: "1px solid #2a2f36",
        padding: "20px",
        zIndex: 20,
        color: "#e5e7eb",
        fontFamily: "monospace",
        fontSize: "13px"
      }}
    >

      {/* Header */}
      <div style={{ marginBottom: "25px" }}>
        <div style={{ fontSize: "18px", fontWeight: "bold", letterSpacing: "2px" }}>
          TERRANOX<span style={{ color: "#16a34a" }}>™</span>
        </div>
        <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "4px" }}>
          Terrain Intelligence Platform
        </div>
      </div>

      {/* ================= ANALYSIS MODE ================= */}
      <div style={{ marginBottom: "25px" }}>
        <div style={{ color: "#9ca3af", marginBottom: "10px", fontSize: "11px", letterSpacing: "1px" }}>
          ANALYSIS MODE
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label>
            <input
              type="radio"
              name="mode"
              defaultChecked
              onChange={() => changeMode("stability")}
            />
            {" "}Ecological Stability
          </label>

          <label>
            <input
              type="radio"
              name="mode"
              onChange={() => changeMode("development")}
            />
            {" "}Development Suitability
          </label>

          <label>
            <input
              type="radio"
              name="mode"
              onChange={() => changeMode("conservation")}
            />
            {" "}Conservation Priority
          </label>
        </div>
      </div>

      {/* ================= LAYERS ================= */}
      <div style={{ marginBottom: "25px" }}>
        <div style={{ color: "#9ca3af", marginBottom: "10px", fontSize: "11px", letterSpacing: "1px" }}>
          LAYERS
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label>
            <input
              type="checkbox"
              onChange={(e) =>
                toggleLayer("vegetation-layer", e.target.checked)
              }
            />
            {" "}Vegetation Health
          </label>

          <label>
            <input
              type="checkbox"
              onChange={(e) =>
                toggleLayer("water-layer", e.target.checked)
              }
            />
            {" "}Water Availability
          </label>

          <label>
            <input
              type="checkbox"
              onChange={(e) =>
                toggleLayer("corridor-layer", e.target.checked)
              }
            />
            {" "}Wildlife Corridors
          </label>

          <label>
            <input
              type="checkbox"
              onChange={(e) =>
                toggleLayer("flood-layer", e.target.checked)
              }
            />
            {" "}Flood Risk
          </label>
        </div>
      </div>

      {/* ================= MONITORING ================= */}
      <div style={{ borderTop: "1px solid #2a2f36", paddingTop: "20px" }}>
        <div style={{ color: "#9ca3af", marginBottom: "10px", fontSize: "11px", letterSpacing: "1px" }}>
          MONITORING
        </div>

        <button
          style={{
            width: "100%",
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            color: "#e5e7eb",
            padding: "8px",
            marginBottom: "10px",
            cursor: "pointer"
          }}
          onClick={() => {
            if (window.enableRegionMonitor) {
              window.enableRegionMonitor();
            }
          }}
        >
          Monitor Region
        </button>

        <button
          style={{
            width: "100%",
            backgroundColor: "#0f172a",
            border: "1px solid #374151",
            color: "#e5e7eb",
            padding: "8px",
            cursor: "pointer"
          }}
          onClick={() => {
            if (window.showPaywall) {
              window.showPaywall();
            }
          }}
        >
          Generate Report 🔒
        </button>

      </div>

    </div>
  );
}
