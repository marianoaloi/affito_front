"use client";

import { useMemo } from "react";
import { StatisticsChartPageProps } from "./StatisticsCharPageProps";
import { TotalBox, TotalItem, TotalItemProvince, TotalItemType, TotalItemCount } from "./StatisticsChartPage.styled";

export default function StatisticResumeTotal ({ affiti }: StatisticsChartPageProps) {

    interface SimpleCount {
        key: string;
        province: string;
        type: string;
        count: number;
    }

    const aggregatedData = useMemo(() => {
        const counter: Record<string, SimpleCount> = {};

        affiti.forEach((affito) => {
            const province = affito.realEstate.properties?.location?.province || 'Unknown';
            const type = affito.type === "a" ? "Affitto" : "Compra";
            const key = `${province}-${type}`;

            if (!counter[key]) {
                counter[key] = { key, province, type, count: 0 };
            }
            counter[key].count += 1;
        });

        return Object.values(counter);
    }, [affiti]);

    return (
        <TotalBox>
            {aggregatedData.map(d => (
                <TotalItem key={d.key}>
                    <TotalItemProvince>{d.province}</TotalItemProvince>
                    <TotalItemType>{d.type}</TotalItemType>
                    <TotalItemCount>{d.count}</TotalItemCount>
                </TotalItem>
            ))}
        </TotalBox>
    );
}


