"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import type { LatLngTuple } from "leaflet";

const UDINE_POSITION: LatLngTuple = [46.0689, 13.2224];

export default function UdineMapPage() {
  const [info] = useState({
    title: "Udine, Italia",
    description: "Questa è Udine! Puoi personalizzare queste informazioni."
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={UDINE_POSITION} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={UDINE_POSITION}>
          <Popup>
            <h3>{info.title}</h3>
            <p>{info.description}</p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
