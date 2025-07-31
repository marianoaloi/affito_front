"use client"
import { fetchAffito, getFilter, selectAllAffito, useDispatch, useSelector } from "@/redux";
import { useEffect } from "react";
import FeaturesTablePage from "./table/FeaturesTablePage";
import { Loading } from "./component/LoadingError";

export default function Home() {
    const dispatch = useDispatch();
    const affiti = useSelector(selectAllAffito);
    const filter = useSelector(getFilter);
    const isLoading = useSelector(state => state.affiti.loading === 'pending');
    const isError = useSelector(state => state.affiti.loading === 'failed');
    useEffect(() => {
        dispatch(fetchAffito(filter));
    }, [dispatch, filter]);
    return isLoading ? <Loading /> :
           isError ? <p>Error loading data</p> :
    affiti && affiti.length > 0 ? <FeaturesTablePage affiti={affiti} /> : <div>Nessun affito trovato</div>;
}
