"use client";
import { BarChart } from "@mui/x-charts/BarChart";
import { useMemo } from "react";
import { StyledContainer, StyledTitle, StyledSubtitle, StyledChartBox, BarRowComponent } from "./StatisticsChartPage.styled";
import { StatisticsChartPageProps } from "./StatisticsCharPageProps";

interface DisabiliStats {

    province: string;
    si: number;
    no: number;
    empty: number;

}


const BarChartElevator = ({ aggregatedData, normalize }: { aggregatedData: DisabiliStats[], normalize: boolean }) => {

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

export default function AccessoDisabiliStatisticsChartPage({ affiti }: StatisticsChartPageProps) {
    const aggregatedData = useMemo(() => {
        const disable: Record<string, DisabiliStats> = {};

        affiti.forEach((affito) => {
            const province = affito.realEstate.properties?.location?.province || 'Unknown';

            if (!disable[province]) {
                disable[province] = {
                    province,
                    si: 0,
                    no: 0,
                    empty: 0
                };
            }
            const accessoDisabili = affito.realEstate.properties?.primaryFeatures?.find(f => f.name.toUpperCase() === "ACCESSO PER DISABILI")

            const fieldProvince = disable[province];
            if (accessoDisabili) {
                if (accessoDisabili.value == 1) {
                    fieldProvince.si += 1;
                } else if (accessoDisabili.value == 0) {
                    fieldProvince.no += 1;
                }
            } else {
                fieldProvince.empty += 1;
            }

        });

        return Object.values(disable);
    }, [affiti]);



    return (
        <StyledContainer maxWidth="lg">
            <StyledTitle variant="h4" component="h1" gutterBottom>
                Statistics by Province and Disabled Access
            </StyledTitle>
            <StyledSubtitle variant="body1" color="text.secondary">
                Property count distribution across provinces, segregated by Disabled Access
            </StyledSubtitle>

            <BarRowComponent>

                <BarChartElevator aggregatedData={aggregatedData} normalize={false} />
                <BarChartElevator aggregatedData={aggregatedData} normalize={true} />
            </BarRowComponent>

        </StyledContainer>
    );
}