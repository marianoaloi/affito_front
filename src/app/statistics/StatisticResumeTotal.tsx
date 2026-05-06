"use client";

import { useMemo } from "react";
import { StatisticsChartPageProps } from "./StatisticsCharPageProps";
import { TotalBox, TotalItem } from "./StatisticsChartPage.styled";

export default function StatisticResumeTotal ({ affiti }: StatisticsChartPageProps) {

    interface SimpleCount {

        key: string;
        count: number;

    }
 const aggregatedData = useMemo(() => {
        const counter: Record<string, SimpleCount> = {};

        affiti.forEach((affito) => {
            const province = affito.realEstate.properties?.location?.province || 'Unknown';
            const type = affito.type === "a" ? "Aff" : "Com";
            const key = `${province}-${type}`;

            if (!counter[key]) {
                counter[key] = {
                    key,
                    count: 0
                };
            }

            const fieldProvince = counter[key];
            
                fieldProvince.count += 1;
            

        });

        return Object.values(counter);
    }, [affiti]);

    return (
        <TotalBox>
            
            {
            aggregatedData.map(d => <TotalItem key={d.key}>{d.key} : {d.count}</TotalItem>)
            }
            </TotalBox>
    );
}


