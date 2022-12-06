import React from "react";
import Plate from "./components/Plate";

const App = () => {
  const [width, setWidth] = React.useState(20);
  const [height, setHeight] = React.useState(20);
  const [bombs, setBombs] = React.useState(100);

  return (
    <div style={{ display: "flex" }}>
      <Plate width={width} height={height} bombs={bombs} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="width">Largeur : </label>
        <input
          id="width"
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
        <label htmlFor="height">Hauteur : </label>
        <input
          id="height"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <label htmlFor="bombs">Bombes : </label>
        <input
          id="bombs"
          type="number"
          value={bombs}
          onChange={(e) => setBombs(e.target.value)}
        />
      </div>
    </div>
  );
};

export default App;
