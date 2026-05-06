import { Box, Container, Typography, TypographyProps } from "@mui/material";
import styled from "@emotion/styled";

export const StyledContainer = styled(Container)`
    margin-top: 32px;
    margin-bottom: 32px;
    background: white;

    
    @media (max-width: 600px) {
        .perc{
            display: none;
        }
    }
`;

export const StyledTitle = styled(Typography)<TypographyProps>`
    /* h4 variant with gutterBottom spacing is handled by MUI */
    color: #000000;
`;

export const BarRowComponent = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const StyledSubtitle = styled(Typography)<TypographyProps>`
    margin-bottom: 24px;
`;

export const StyledChartBox = styled(Box)`
    width: 100%;
    height: 500px;
`;


export const TotalBox = styled.div` 
    @media (min-width: 600px) {
        padding-left: 24px;
        padding-right: 24px;
    }
        display: flex;
        justify-content: space-between;
`;

export const TotalItem = styled.span` 

`;

export const GraphySize = { top: 10, right: 50, bottom: 80, left: 10 }