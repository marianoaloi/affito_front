"use client"
import { fetchStatistics, selectAllStatistics, isLoadingStatistics, useDispatch, useSelector } from "@/redux";
import { useEffect } from "react";
import { Loading } from "../component/LoadingError";
import StatisticsChartPage from "./StatisticsChartPage";

export default function Statistics() {
    const dispatch = useDispatch();
    const statistics = useSelector(selectAllStatistics);
    const isLoading = useSelector(isLoadingStatistics);

    useEffect(() => {
        dispatch(fetchStatistics());
    }, [dispatch]);

    return isLoading ? <Loading /> :
        statistics && statistics.length > 0 ?
            <StatisticsChartPage affiti={statistics} /> :
            <div>No statistics data found</div>;
}
