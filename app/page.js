"use client";
import { useState, useEffect } from "react";
import GISMap from "../components/GISMap";
import Sidebar from "../components/Sidebar";
import StatusBar from "../components/StatusBar";
import Legend from "../components/Legend";
import LandHealthPanel from "../components/LandHealthPanel";
import RegionDossier from "../components/RegionDossier";
import PaywallOverlay from "../components/PaywallOverlay";

export default function Home() {

  const [mapInstance, setMapInstance] = useState(null);
  const [landHealth, setLandHealth] = useState(null);
  const [regionReport, setRegionReport] = useState(null);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    window.setLandHealth = setLandHealth;

    window.generateRegionReport = (data) => {
      setRegionReport(data);
    };

    window.showPaywall = () => {
      setShowPaywall(true);
    };
  }, []);

  const handleCloseDossier = () => {
    setRegionReport(null);

    if (mapInstance) {
      try {
        if (mapInstance.getLayer("draw-box")) {
          mapInstance.removeLayer("draw-box");
        }
        if (mapInstance.getSource("draw-box")) {
          mapInstance.removeSource("draw-box");
        }
      } catch (err) {
        console.log("Cleanup safe:", err);
      }
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden"
      }}
    >

      {/* Map */}
      <GISMap setMapInstance={setMapInstance} />

      {/* Sidebar */}
      <Sidebar map={mapInstance} />

      {/* Status + Legend */}
      <StatusBar />
      <Legend />

      {/* LHI Panel */}
      <LandHealthPanel data={landHealth} />

      {/* Region Dossier */}
      <RegionDossier
        data={regionReport}
        onClose={handleCloseDossier}
      />

      {/* 🔥 Paywall Overlay */}
      {showPaywall && (
        <PaywallOverlay onClose={() => setShowPaywall(false)} />
      )}

    </div>
  );
}
