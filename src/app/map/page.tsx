"use client";

import { selectAllAffito, getFilter, fetchAffito, useDispatch } from "@/redux";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { promises } from "dns";
const Map = dynamic(() => import('./Map').then((mod) => mod.Map), { loading:() => <p>Loading Map</p>, ssr: false });


export default function MapPage() {
  
      const dispatch = useDispatch();
      const affiti = useSelector(selectAllAffito);
      const filter = useSelector(getFilter)
      const [map, setMap] = useState<JSX.Element | null>(null);
      useEffect(() => {
          dispatch(fetchAffito(filter));
          setMap(<Map affiti={affiti} />);
      }, [dispatch, filter]);
      

      return affiti && affiti.length > 0 ? map : <div>Nessun affito trovato</div>;
  
}
