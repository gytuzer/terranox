"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import vegetationData from "../public/data/vegetation.json";
import waterData from "../public/data/water.json";
import floodData from "../public/data/flood.json";
import corridorData from "../public/data/corridors.json";

export default function GISMap({ setMapInstance }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const clickMarker = useRef(null);
  const regionMode = useRef(false);

  useEffect(() => {
    if (map.current) return;

    window.analysisMode = "stability";

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256
          }
        },
        layers: [
          {
            id: "osm-layer",
            type: "raster",
            source: "osm"
          }
        ]
      },
      center: [80.2707, 13.0827],
      zoom: 9
    });

    if (setMapInstance) {
      setMapInstance(map.current);
    }

    map.current.on("load", () => {

      // ================= LAYERS =================

      map.current.addSource("vegetation", { type: "geojson", data: vegetationData });
      map.current.addLayer({
        id: "vegetation-layer",
        type: "circle",
        source: "vegetation",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["get", "intensity"], 0.3, 20, 0.6, 40, 0.9, 60],
          "circle-color": ["interpolate", ["linear"], ["get", "intensity"], 0.3, "#14532d", 0.6, "#16a34a", 0.9, "#4ade80"],
          "circle-opacity": 0.6,
          "circle-blur": 0.7
        },
        layout: { visibility: "none" }
      });

      map.current.addSource("water", { type: "geojson", data: waterData });
      map.current.addLayer({
        id: "water-layer",
        type: "circle",
        source: "water",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["get", "availability"], 0.3, 20, 0.6, 40, 0.9, 60],
          "circle-color": ["interpolate", ["linear"], ["get", "availability"], 0.3, "#1e3a8a", 0.6, "#2563eb", 0.9, "#93c5fd"],
          "circle-opacity": 0.6,
          "circle-blur": 0.7
        },
        layout: { visibility: "none" }
      });

      map.current.addSource("flood", { type: "geojson", data: floodData });
      map.current.addLayer({
        id: "flood-layer",
        type: "circle",
        source: "flood",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["get", "risk"], 0.3, 30, 0.6, 50, 0.9, 75],
          "circle-color": ["interpolate", ["linear"], ["get", "risk"], 0.3, "#f87171", 0.6, "#ef4444", 0.9, "#991b1b"],
          "circle-opacity": 0.65,
          "circle-blur": 0.8
        },
        layout: { visibility: "none" }
      });

      map.current.addSource("corridors", { type: "geojson", data: corridorData });
      map.current.addLayer({
        id: "corridor-layer",
        type: "line",
        source: "corridors",
        paint: {
          "line-width": ["interpolate", ["linear"], ["get", "strength"], 0.4, 2, 0.6, 4, 0.8, 6],
          "line-color": "#facc15",
          "line-dasharray": [2, 2],
          "line-opacity": 0.9
        },
        layout: { visibility: "none" }
      });

      // ================= DRAG REGION SELECTION =================

      let isDragging = false;
      let startLngLat = null;

      window.enableRegionMonitor = () => {
        regionMode.current = true;
        map.current.getCanvas().style.cursor = "crosshair";
      };

      const canvas = map.current.getCanvas();

      canvas.addEventListener("mousedown", (e) => {
        if (!regionMode.current) return;
        isDragging = true;
        startLngLat = map.current.unproject([e.clientX, e.clientY]);
      });

      canvas.addEventListener("mousemove", (e) => {
        if (!isDragging || !startLngLat) return;

        const currentLngLat = map.current.unproject([e.clientX, e.clientY]);

        const bbox = [
          [startLngLat.lng, startLngLat.lat],
          [currentLngLat.lng, startLngLat.lat],
          [currentLngLat.lng, currentLngLat.lat],
          [startLngLat.lng, currentLngLat.lat],
          [startLngLat.lng, startLngLat.lat]
        ];

        if (map.current.getLayer("draw-box")) {
          map.current.getSource("draw-box").setData({
            type: "Feature",
            geometry: { type: "Polygon", coordinates: [bbox] }
          });
        } else {
          map.current.addSource("draw-box", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: { type: "Polygon", coordinates: [bbox] }
            }
          });

          map.current.addLayer({
            id: "draw-box",
            type: "line",
            source: "draw-box",
            paint: {
              "line-color": "#facc15",
              "line-width": 2
            }
          });
        }
      });

      canvas.addEventListener("mouseup", (e) => {
        if (!isDragging || !startLngLat) return;

        isDragging = false;
        regionMode.current = false;
        map.current.getCanvas().style.cursor = "";

        const endLngLat = map.current.unproject([e.clientX, e.clientY]);

        const width = Math.abs(endLngLat.lng - startLngLat.lng);
        const height = Math.abs(endLngLat.lat - startLngLat.lat);
        const area = width * height * 12321;

        if (area <= 40 && window.generateRegionReport) {
          const randomAQI = (70 + Math.random() * 30).toFixed(0);

          window.generateRegionReport({
            area: area.toFixed(2),
            boundsText: `${startLngLat.lng.toFixed(2)}–${endLngLat.lng.toFixed(2)}°E | ${startLngLat.lat.toFixed(2)}–${endLngLat.lat.toFixed(2)}°N`,
            elevation: "22–41",
            timestamp: new Date().toISOString(),
            confidence: 87,
            vegetationMean: "0.68",
            denseCover: 32,
            fragmentation: "0.42",
            ndviClass: "Semi-Continuous Forest",
            waterPresence: 11,
            recharge: "High",
            waterStability: "Moderate",
            waterRisk: "Low–Moderate",
            floodIndex: "0.52",
            drainage: "Elevated",
            floodWarning: "Mitigation Required",
            corridorOverlap: 18,
            habitatSensitivity: "Moderate",
            migrationRisk: "Medium",
            lhi: 63,
            recommendation: "Moderate Ecological Stability",
            mode: window.analysisMode,
            aqi: randomAQI
          });
        }

        startLngLat = null;
      });

      // ================= LAND HEALTH CLICK =================

      map.current.on("click", (e) => {
        if (regionMode.current) return;

        const clicked = [e.lngLat.lng, e.lngLat.lat];

        if (clickMarker.current) clickMarker.current.remove();

        clickMarker.current = new maplibregl.Marker({ color: "#facc15" })
          .setLngLat(clicked)
          .addTo(map.current);

        const computeScore = (data, property) => {
          let total = 0;
          const radius = 0.5;

          data.features.forEach(feature => {
            if (feature.geometry.type !== "Point") return;

            const [lng, lat] = feature.geometry.coordinates;
            const value = feature.properties[property];

            const distance = Math.sqrt(
              Math.pow(clicked[0] - lng, 2) +
              Math.pow(clicked[1] - lat, 2)
            );

            if (distance < radius) {
              const weight = 1 - (distance / radius);
              total += value * weight;
            }
          });

          return total;
        };

        const V = computeScore(vegetationData, "intensity");
        const W = computeScore(waterData, "availability");
        const F = computeScore(floodData, "risk");
        const C = computeScore(corridorData, "strength");

        let score = 50;
        const mode = window.analysisMode;

        if (mode === "stability") score += V * 35 + W * 25 - F * 70 - C * 10;
        if (mode === "development") score += V * 15 + W * 20 - F * 80 - C * 40;
        if (mode === "conservation") score += V * 50 + W * 20 - F * 30 + C * 40;

        if (F > 0.3 && mode !== "conservation") score -= 40;

        score = Math.max(0, Math.min(100, score));

        const randomAQI = (70 + Math.random() * 30).toFixed(0);

        if (window.setLandHealth) {
          window.setLandHealth({
            vegetation: V.toFixed(2),
            water: W.toFixed(2),
            flood: F.toFixed(2),
            corridor: C.toFixed(2),
            total: score.toFixed(0),
            mode,
            recommendation: "",
            aqi: randomAQI
          });
        }
      });

    });

  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
      }}
    />
  );
}
