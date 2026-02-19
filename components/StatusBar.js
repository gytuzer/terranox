export default function StatusBar() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "28px",
        backgroundColor: "#11161c",
        borderTop: "1px solid #2a2f36",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        fontSize: "11px",
        color: "#9ca3af",
        fontFamily: "monospace",
        zIndex: 20
      }}
    >
      <div>Last Updated: 02 Feb 2026</div>
      <div>Data Sources: OSM | Sentinel | Open EO</div>
      <div>System Confidence: 92%</div>
    </div>
  );
}
