"use client";

import AccessoDisabiliStatisticsChartPage from "./AccessoDisabiliStatisticsChartPage";
import ElevatorStatisticsChartPage from "./ElevatorStatisticsChartPage";
import ProvinceStatisticsChartPage from "./ProvinceStatisticsChartPage";
import StatisticResumeTotal from "./StatisticResumeTotal";
import { StatisticsChartPageProps } from "./StatisticsCharPageProps";




export default function StatisticsChartPage({ affiti }: StatisticsChartPageProps) {
    return (
        <main>
            <StatisticResumeTotal affiti={affiti} />
            <AccessoDisabiliStatisticsChartPage affiti={affiti} />
            <ElevatorStatisticsChartPage affiti={affiti} />
            <ProvinceStatisticsChartPage affiti={affiti} />
        </main>
    );

}
