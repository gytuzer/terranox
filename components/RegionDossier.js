"use client";

export default function RegionDossier({ data, onClose }) {
  if (!data) return null;

  const sectionTitle = {
    fontWeight: "bold",
    fontSize: "15px",
    marginTop: "20px",
    marginBottom: "8px",
    color: "#f3f4f6"
  };

  const label = {
    color: "#9ca3af",
    fontSize: "12px"
  };

  const value = {
    fontSize: "13px",
    marginBottom: "4px"
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        height: "100vh",
        width: "520px",
        backgroundColor: "#0f172a",
        borderLeft: "1px solid #1f2937",
        padding: "24px",
        overflowY: "auto",
        zIndex: 40,
        fontFamily: "monospace",
        color: "#e5e7eb"
      }}
    >
      {/* Close Button */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          top: "15px",
          right: "20px",
          cursor: "pointer",
          fontSize: "14px",
          color: "#9ca3af"
        }}
      >
        ✕ Close
      </div>

      <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>
        REGION ECOLOGICAL INTELLIGENCE DOSSIER
      </div>

      {/* ================= METADATA ================= */}
      <div style={sectionTitle}>1. Spatial Metadata</div>

      <div style={label}>Bounding Coordinates</div>
      <div style={value}>{data.boundsText}</div>

      <div style={label}>Area</div>
      <div style={value}>{data.area} km²</div>

      <div style={label}>Elevation Range</div>
      <div style={value}>{data.elevation} m ASL</div>

      <div style={label}>Satellite Source</div>
      <div style={value}>Sentinel-2 MSI (10m)</div>

      <div style={label}>Data Timestamp</div>
      <div style={value}>{data.timestamp}</div>

      <div style={label}>Model Confidence</div>
      <div style={value}>{data.confidence}%</div>

      {/* ================= VEGETATION ================= */}
      <div style={sectionTitle}>2. Vegetation & Land Cover</div>

      <div style={label}>Mean Vegetation Index</div>
      <div style={value}>{data.vegetationMean}</div>

      <div style={label}>Dense Cover Percentage</div>
      <div style={value}>{data.denseCover}%</div>

      <div style={label}>Fragmentation Index</div>
      <div style={value}>{data.fragmentation}</div>

      <div style={label}>NDVI Classification</div>
      <div style={value}>{data.ndviClass}</div>

      {/* ================= WATER ================= */}
      <div style={sectionTitle}>3. Hydrological Profile</div>

      <div style={label}>Surface Water Presence</div>
      <div style={value}>{data.waterPresence}%</div>

      <div style={label}>Recharge Potential</div>
      <div style={value}>{data.recharge}</div>

      <div style={label}>Seasonal Stability</div>
      <div style={value}>{data.waterStability}</div>

      <div style={label}>Water Quality Risk</div>
      <div style={value}>{data.waterRisk}</div>

      {/* ================= FLOOD ================= */}
      <div style={sectionTitle}>4. Flood & Drainage Exposure</div>

      <div style={label}>Flood Exposure Index</div>
      <div style={value}>{data.floodIndex}</div>

      <div style={label}>Drainage Sensitivity</div>
      <div style={value}>{data.drainage}</div>

      <div style={label}>Development Warning</div>
      <div style={value}>{data.floodWarning}</div>

      {/* ================= CORRIDOR ================= */}
      <div style={sectionTitle}>5. Ecological Connectivity</div>

      <div style={label}>Corridor Overlap</div>
      <div style={value}>{data.corridorOverlap}%</div>

      <div style={label}>Habitat Sensitivity</div>
      <div style={value}>{data.habitatSensitivity}</div>

      <div style={label}>Migration Interference Risk</div>
      <div style={value}>{data.migrationRisk}</div>

      {/* ================= LHI ================= */}
      <div style={sectionTitle}>6. Composite Land Health Index</div>

      <div style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "6px" }}>
        LHI: {data.lhi} / 100
      </div>

      <div style={value}>{data.recommendation}</div>

      {/* ================= EXTENDED ANALYSIS ================= */}
      <div style={sectionTitle}>7. Extended Ecological Assessment</div>

      <div style={{ fontSize: "13px", lineHeight: "1.6", color: "#cbd5e1" }}>
        The selected region lies within a transitional peri-urban ecological gradient.
        Vegetation clusters remain moderately resilient, particularly in western
        segments, indicating residual natural cover. Hydrological indicators suggest
        favorable recharge dynamics, though localized flood exposure significantly
        influences development feasibility. Ecological corridor interaction suggests
        moderate habitat connectivity sensitivity. Strategic mitigation planning is
        recommended to preserve long-term ecological balance.
      </div>

      <div style={sectionTitle}>8. Strategic Recommendations</div>

      <div style={{ fontSize: "13px", lineHeight: "1.6", color: "#cbd5e1" }}>
        • Implement flood mitigation infrastructure in low-elevation zones.  
        • Preserve dense vegetation clusters to enhance soil retention.  
        • Maintain minimum 300m ecological buffer near corridor intersections.  
        • Conduct periodic satellite monitoring for land-cover transition trends.
      </div>

      <div style={{ marginTop: "30px", fontSize: "11px", color: "#6b7280" }}>
        Generated by Environmental Intelligence Engine v1.2 — Prototype Build
      </div>
    </div>
  );
}
