"use client";

import AccessoDisabiliStatisticsChartPage from "./AccessoDisabiliStatisticsChartPage";
import ElevatorStatisticsChartPage from "./ElevatorStatisticsChartPage";
import ProvinceStatisticsChartPage from "./ProvinceStatisticsChartPage";
import { StatisticsChartPageProps } from "./StatisticsCharPageProps";




export default function StatisticsChartPage({ affiti }: StatisticsChartPageProps) {
    return (
        <main>
            <ProvinceStatisticsChartPage affiti={affiti} />
            <ElevatorStatisticsChartPage affiti={affiti} />
            <AccessoDisabiliStatisticsChartPage affiti={affiti} />
        </main>
    );

}
