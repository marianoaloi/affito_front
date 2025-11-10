"use client";

import { BarChart } from "@mui/x-charts/BarChart";
import { useMemo } from "react";
import { StyledContainer, StyledTitle, StyledSubtitle, StyledChartBox, BarRowComponent } from "./StatisticsChartPage.styled";
import { StatisticsChartPageProps } from "./StatisticsCharPageProps";

interface ElevatorStats {

    province: string;
    si: number;
    no: number;
    empty: number;

}

const BarChartElevator = ({aggregatedData,normalize} : {aggregatedData : ElevatorStats[],normalize : boolean}) => {
    
    const provinces = aggregatedData.map(d => d.province);
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
                            data: provinces,
                            label: 'Province'
                        }
                    ]}
                    yAxis={[
                        {
                            label: 'Count'
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
                            label: 'Empty',
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

        const elevatorCount = affiti.map(a => {
            return {
                elevator: a.realEstate.properties[0].featureList.find(f => f.type == 'elevator')?.compactLabel || 'empty',
                province: a.realEstate.properties[0].location.province
            };
        });

        elevatorCount.forEach(({ elevator, province }) => {
            if (!ElevatorStatsMap[province]) {
                ElevatorStatsMap[province] = { province, si: 0, no: 0, empty: 0 };
            }
            if (elevator === 'Sì') {
                ElevatorStatsMap[province].si += 1;
            } else if (elevator === 'No') {
                ElevatorStatsMap[province].no += 1;
            } else {
                ElevatorStatsMap[province].empty += 1;
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