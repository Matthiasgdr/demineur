import React from "react";
import styled from "styled-components";
import Plate from "./components/Plate";
import Providers from "./Providers";

import "./index.css";

const App = () => {
  const [width, setWidth] = React.useState(35);
  const [height, setHeight] = React.useState(25);
  const [bombs, setBombs] = React.useState(120);

  return (
    <Providers>
      <Container style={{ display: "flex" }}>
        <div style={{ display: "flex", margin: "8px" }}>
          <InputWrapper>
            <label htmlFor="width">Largeur : </label>
            <input
              id="width"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="height">Hauteur : </label>
            <input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="bombs">Bombes : </label>
            <input
              id="bombs"
              type="number"
              value={bombs}
              onChange={(e) => setBombs(e.target.value)}
            />
          </InputWrapper>
        </div>
        <Plate width={width} height={height} bombs={bombs} />
      </Container>
    </Providers>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: "Poppins", sans-serif;
  height: 100vh;
  width: 100%;
  background-color: #ffe8ee;
`;

const InputWrapper = styled.div`
  margin: 0 8px;
`;

export default App;
