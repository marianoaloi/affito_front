import styled from "@emotion/styled";


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
    `

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