"use client";
import { BarChart } from "@mui/x-charts/BarChart";
import { useMemo } from "react";
import { StyledContainer, StyledTitle, StyledSubtitle, StyledChartBox, BarRowComponent } from "./StatisticsChartPage.styled";
import { StatisticsChartPageProps } from "./StatisticsCharPageProps";


interface ProvinceStats {
    province: string;
    approved: number;
    waiting: number;
    denied: number;
    empty: number;
}

const BarChartProvince = ({aggregatedData,normalize} : {aggregatedData : ProvinceStats[],normalize : boolean}) => {
    
    const provinces = aggregatedData.map(d => d.province);
    let approvedData = aggregatedData.map(d => d.approved);
    let waitingData = aggregatedData.map(d => d.waiting);
    let deniedData = aggregatedData.map(d => d.denied);
    let emptyData = aggregatedData.map(d => d.empty);

    if (normalize) {
        const totalCounts = aggregatedData.map(d => d.approved + d.waiting + d.denied + d.empty);
        const normalizeData = (data: number[], totals: number[]) =>
            data.map((value, index) => (totals[index] > 0 ? (value / totals[index]) * 100 : 0));

        approvedData = normalizeData(approvedData, totalCounts);
        waitingData = normalizeData(waitingData, totalCounts);
        deniedData = normalizeData(deniedData, totalCounts);
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
                            label: normalize ? ' % ' : 'Count'
                        }
                    ]}
                    series={[
                        {
                            data: approvedData,
                            label: 'Approved',
                            color: '#4caf50',
                            stack: 'status'
                        },
                        {
                            data: waitingData,
                            label: 'Waiting',
                            color: '#ff9800',
                            stack: 'status'
                        },
                        {
                            data: deniedData,
                            label: 'Denied',
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
}

export default function ProvinceStatisticsChartPage({ affiti }: StatisticsChartPageProps) {
    const aggregatedData = useMemo(() => {
        const provinceStatsMap: Record<string, ProvinceStats> = {};

        affiti.forEach(affito => {
            const province = affito.realEstate.properties?.location?.province || 'Unknown';
            const state = affito.stateMaloi;

            if (!provinceStatsMap[province]) {
                provinceStatsMap[province] = {
                    province,
                    approved: 0,
                    waiting: 0,
                    denied: 0,
                    empty: 0
                };
            }

            if (state === 1) {
                provinceStatsMap[province].approved++;
            } else if (state === 2) {
                provinceStatsMap[province].waiting++;
            } else if (state === 0) {
                provinceStatsMap[province].denied++;
            } else {
                provinceStatsMap[province].empty++;
            }
        });

        return Object.values(provinceStatsMap);
    }, [affiti]);


    return (
        <StyledContainer maxWidth="lg">
            <StyledTitle variant="h4" component="h1" gutterBottom>
                Statistics by Province and Status
            </StyledTitle>
            <StyledSubtitle variant="body1" color="text.secondary">
                Property count distribution across provinces, segregated by approval status
            </StyledSubtitle>
            <BarRowComponent>
                
            <BarChartProvince aggregatedData={aggregatedData} normalize={false} />
            <BarChartProvince aggregatedData={aggregatedData} normalize={true} />
            </BarRowComponent>
        </StyledContainer>
    );
}