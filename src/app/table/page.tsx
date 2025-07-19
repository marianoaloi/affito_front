"use client"
import FeaturesTablePage from "./FeaturesTablePage";
import { fetchAffito, getFilter, useDispatch, useSelector } from "@/redux";
import { selectAllAffito } from "@/redux/services/affito/affitoSelectors";
import { useEffect } from "react";

export default function Table() {
    const dispatch = useDispatch();
    const affiti = useSelector(selectAllAffito);
    const filter = useSelector(getFilter)
    useEffect(() => {
        dispatch(fetchAffito(filter));
    }, [dispatch, filter]);
    return affiti && affiti.length > 0 ? <FeaturesTablePage affiti={affiti} /> : <div>Nessun affito trovato</div>;
}