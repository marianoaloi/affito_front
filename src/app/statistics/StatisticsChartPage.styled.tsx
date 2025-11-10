import { Box, Container, Typography, TypographyProps } from "@mui/material";
import styled from "@emotion/styled";

export const StyledContainer = styled(Container)`
    margin-top: 32px;
    margin-bottom: 32px;
    background: white;
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
