"use client";

import { selectAllAffito, getFilter, fetchAffito, useDispatch } from "@/redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Map } from "./Map";



export default function MapPage() {
  
      const dispatch = useDispatch();
      const affiti = useSelector(selectAllAffito);
      const filter = useSelector(getFilter)
      
  const [mounted, setMounted] = useState(false);
      useEffect(() => {
          dispatch(fetchAffito(filter));
          
    setMounted(true);
      }, [dispatch, filter]);
      
        if (!mounted) {
    return <div>Loading Map...</div>;
  }

      return affiti && affiti.length > 0 ? <Map affiti={affiti} /> : <div>Nessun affito trovato</div>;
  
}
