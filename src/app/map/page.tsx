"use client";

import { selectAllAffito, getFilter, fetchAffito, useDispatch } from "@/redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Map } from "./Map";


export default function MapPage() {
  
      const dispatch = useDispatch();
      const affiti = useSelector(selectAllAffito);
      const filter = useSelector(getFilter)
      useEffect(() => {
          dispatch(fetchAffito(filter));
      }, [dispatch, filter]);
      return affiti && affiti.length > 0 ? <Map affiti={affiti} /> : <div>Nessun affito trovato</div>;
  
}
