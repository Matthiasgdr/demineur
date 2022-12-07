import styled from "styled-components";

export const StyledPlate = styled.div`
  display: grid;
  width: ${(p) => p.width * 30}px;
  grid-template-columns: repeat(${(p) => p.width}, 1fr);
  grid-auto-columns: min-content;
`;

export const PlateWrapper = styled.div`
  position: relative;
`;

export const LoseScreen = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgb(39, 42, 103, 0.7);
  color: white;
  font-weight: 700;
  font-size: 42px;
`;

export const WinScreen = styled.div`
  position: absolute;
  inset: 0;
`;
