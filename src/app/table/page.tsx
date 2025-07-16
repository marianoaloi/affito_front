"use client"
import FeaturesTablePage from "./FeaturesTablePage";
import { affitoActions, fetchAffito, useDispatch, useSelector } from "@/redux";
import { selectAllAffito } from "@/redux/services/affito/selectors";
import { useEffect } from "react";

export default function Table() {
    const dispatch = useDispatch();
    const affiti = useSelector(selectAllAffito);
    useEffect(() => {
        dispatch(fetchAffito());
    }, [dispatch]);
    return affiti && affiti.length > 0 ? <FeaturesTablePage affiti={affiti} /> : <div>Nessun affito trovato</div>;
}