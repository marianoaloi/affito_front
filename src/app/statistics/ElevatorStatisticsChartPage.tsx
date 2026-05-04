"use client";

import { BarChart } from "@mui/x-charts/BarChart";
import { useMemo } from "react";
import { StyledContainer, StyledTitle, StyledSubtitle, StyledChartBox, BarRowComponent } from "./StatisticsChartPage.styled";
import { StatisticsChartPageProps } from "./StatisticsCharPageProps";

interface ElevatorStats {

    key: string;
    si: number;
    no: number;
    empty: number;

}

const BarChartElevator = ({aggregatedData,normalize} : {aggregatedData : ElevatorStats[],normalize : boolean}) => {
    
    const keys = aggregatedData.map(d => d.key);
    let siData = aggregatedData.map(d => d.si);
    let noData = aggregatedData.map(d => d.no);
    let emptyData = aggregatedData.map(d => d.empty);

    if (normalize) {
        const totalCounts = aggregatedData.map(d => d.si + d.no + d.empty);
        const normalizeData = (data: number[], totals: number[]) =>
            data.map((value, index) => (totals[index] > 0 ? (value / totals[index]) * 100 : 0));
        siData = normalizeData(siData, totalCounts);
        noData = normalizeData(noData, totalCounts);
        emptyData = normalizeData(emptyData, totalCounts);
    }

    
    return (
        <StyledChartBox>
                <BarChart
                    xAxis={[
                        {
                            scaleType: 'band',
                            data: keys,
                            label: 'Province'
                        }
                    ]}
                    yAxis={[
                        {
                            label: normalize ? ' % ' : 'Count'
                        }
                    ]}
                    series={[
                        {
                            data: siData,
                            label: 'Yes',
                            color: '#4caf50',
                            stack: 'status'
                        },
                        {
                            data: noData,
                            label: 'No',
                            color: '#f44336',
                            stack: 'status'
                        },
                        {
                            data: emptyData,
                            label: 'Senza Info',
                            color: '#9e9e9e',
                            stack: 'status'
                        }
                    ]}
                    height={500}
                    margin={{ top: 50, right: 50, bottom: 80, left: 80 }}
                    slotProps={{
                        legend: {
                            direction: 'horizontal',
                            position: { vertical: 'top', horizontal: 'center' },
                        }
                    }}
                />
            </StyledChartBox>
    );
};

export default function ElevatorStatisticsChartPage({ affiti }: StatisticsChartPageProps) {
    const aggregatedData = useMemo(() => {
        const ElevatorStatsMap: Record<string, ElevatorStats> = {};

        affiti.forEach(a => {

            const elevator = a.realEstate?.properties?.mainFeatures?.find(f => f.type == 'elevator')?.compactLabel || 'Senza Info';
            
            const province = a.realEstate.properties?.location?.province || 'Unknown';
            const type = a.type === "a" ? "Aff" : "Com";
            const key = `${province}-${type}`;
            
 
            if(!ElevatorStatsMap[key])
                ElevatorStatsMap[key] = { key, si: 0, no: 0, empty: 0 };
            
            const ele = ElevatorStatsMap[key] ;
            
            if (elevator === 'Sì') {
                ele.si += 1;
            } else if (elevator === 'No') {
                ele.no += 1;
            } else {
                ele.empty += 1;
            }
        });

        return Object.values(ElevatorStatsMap);

    }, [affiti]);
    return (
        <StyledContainer maxWidth="lg">
            <StyledTitle variant="h4" component="h1" gutterBottom>
                Statistics by Province and Elevator
            </StyledTitle>
            <StyledSubtitle variant="body1" color="text.secondary">
                Property count distribution across provinces, segregated by elevator status
            </StyledSubtitle>
            <BarRowComponent>

                <BarChartElevator aggregatedData={aggregatedData} normalize={false} />
                <BarChartElevator aggregatedData={aggregatedData} normalize={true} />
            </BarRowComponent>
        </StyledContainer>
    );
}