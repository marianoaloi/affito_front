"use client";
import { BarChart } from "@mui/x-charts/BarChart";
import { useMemo } from "react";
import { StyledContainer, StyledTitle, StyledSubtitle, StyledChartBox } from "./StatisticsChartPage.styled";
import { StatisticsChartPageProps } from "./StatisticsCharPageProps";

interface DisabiliStats {

    province: string;
    number: number;

}

export default function AccessoDisabiliStatisticsChartPage({ affiti }: StatisticsChartPageProps) {
    const aggregatedData = useMemo(() => {
        const disable: Record<string, DisabiliStats> = {};

        affiti.forEach((affito) => {
            const province = affito.realEstate.properties[0]?.location?.province || 'Unknown';

            if (!disable[province]) {
                disable[province] = {
                    province,
                    number: 0,
                };
            }

            if (affito.realEstate.properties[0]?.ga4features?.find(f => f === "accesso per disabili")) {
                disable[province].number += 1;
            }

        });

        return Object.values(disable);
    }, [affiti]);

    
    const provinces = aggregatedData.map(d => d.province);
    const numberData = aggregatedData.map(d => d.number);

    return (
        <StyledContainer maxWidth="lg">
            <StyledTitle variant="h4" component="h1" gutterBottom>
                Statistics by Province and Disabled Access
            </StyledTitle>
            <StyledSubtitle variant="body1" color="text.secondary">
                Property count distribution across provinces, segregated by Disabled Access
            </StyledSubtitle>  
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
                            data: numberData,
                            label: 'Number of Properties with Disabled Access',
                            color: '#4caf50',
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

        </StyledContainer>
    );
}