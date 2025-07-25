"use client";
"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { fetchAffito, getFilter, useDispatch, useSelector } from "@/redux";

const DynamicMap = dynamic(() => import("./UdineMapComponent").then((mod) => mod.default), {loading:()=><p>Loading Map</p>, ssr: false });

export default function UdineMapPage() {
    const dispatch = useDispatch();
    const filter = useSelector(getFilter)
    useEffect(() => {
          dispatch(fetchAffito(filter));
    }, []);
  return <DynamicMap />;
}
