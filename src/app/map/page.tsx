"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import './UdineMapComponent.css'
import { useEffect } from "react";
import { fetchAffito, fetchCount, getFilter, useDispatch, useSelector } from "@/redux";
import { Loading } from "../component/LoadingError";

const DynamicMap = dynamic(() => import("./UdineMapComponent").then((mod) => mod.default), {loading:()=><p>Loading Map</p>, ssr: false });
  
export default function UdineMapPage() {
      const dispatch = useDispatch();
      const filter = useSelector(getFilter)
      useEffect(() => {
          dispatch(fetchAffito( filter));
          dispatch(fetchCount())
    }, [dispatch, filter.type, filter.province]);
  const isLoading = useSelector(state => state.affiti.loading === 'pending'); 
      return isLoading ? <Loading /> :
       <DynamicMap />;
}
