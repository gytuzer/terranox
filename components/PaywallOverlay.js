"use client";

export default function PaywallOverlay({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(15, 23, 42, 0.55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "480px",
          backgroundColor: "#0f172a",
          border: "1px solid #2a2f36",
          padding: "30px",
          fontFamily: "monospace",
          color: "#e5e7eb"
        }}
      >
        <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>
          Unlock Full Environmental Intelligence
        </div>

        <div style={{ fontSize: "13px", lineHeight: "1.6", marginBottom: "20px", color: "#cbd5e1" }}>
          Acquire all premium capabilities including:
          <br /><br />
          • Long-term temporal report generation  
          • Multi-year land change history  
          • Mass-area historical analysis  
          • Urbanization trend modeling  
          • Footfall & exposure analytics  
          • Deforestation and degradation monitoring  
          • Predictive ecological impact modeling  
          • Timeline-based environmental evolution  
          • Institutional-grade exportable dossiers  
          <br /><br />
          All features at just ₹7000 per month.
        </div>

        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#16a34a",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          PAY NOW
        </button>
      </div>
    </div>
  );
}
