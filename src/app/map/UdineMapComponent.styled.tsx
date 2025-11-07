import styled from "@emotion/styled";
import { Box } from "@mui/material";


export const Photos = styled.div`
  display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: space-between;
    justify-content: space-between;
  `
export const Photo = styled.img`
  width: 80px;
    height: 80px;
    padding: 5px 0px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    border-radius: 4px;
    object-fit: cover;

    &:hover {
      transform: scale(1.05);
    }
    `

export const PhotoPreviewOverlay = styled(Box)`
  position: fixed;
  z-index: 10000;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
`;

export const PhotoPreview = styled.img`
  max-width: 600px;
  max-height: 600px;
  width: auto;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  border: 3px solid white;
  object-fit: contain;
`;

export const MarkerPopup = styled.div`
    position: absolute;
    top: 70px;
    right: 10px;
    background: rgba(255, 255, 255, 0.9);
    padding: 10px;
    border-radius: 5px;
    z-index: 1000;
    font-size: 12px;
    font-family: monospace;
    color: black;
`