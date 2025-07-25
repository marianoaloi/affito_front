"use client";
"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const DynamicMap = dynamic(() => import("./UdineMapComponent").then((mod) => mod.default), { ssr: false });

export default function UdineMapPage() {
  return <DynamicMap />;
}
