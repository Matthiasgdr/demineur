import React from "react";
import styled from "styled-components";

import { initPlateArray, getAroundIndexes } from "./utils/utils";
import Cell from "./Cell";

const Plate = ({ width, height, bombs }) => {
  const [lost, setLost] = React.useState(false);
  const [win, setWin] = React.useState(false);
  const [cells, setCells] = React.useState(
    initPlateArray(width, height, bombs)
  );

  React.useEffect(() => {
    setCells(initPlateArray(width, height, bombs));
  }, [width, height, bombs]);

  React.useEffect(() => {
    if (cells.filter((c) => c.status !== "BOMB").every((c) => c.discover)) {
      setWin(true);
    }
  }, [cells]);

  const handleDiscover = (i) => {
    if (!lost) {
      setCells((prev) => {
        let newCells = [...prev];
        let discoverCellsIndex = [i];
        do {
          let indexToRemove = [];
          let indexToAdd = [];
          discoverCellsIndex.forEach((c) => {
            if (newCells[c].status === 0) {
              newCells[c] = { ...newCells[c], discover: true };
              const aroundIndexes = getAroundIndexes(c, {
                width,
                height,
              }).filter((z) => {
                return !newCells[z]?.discover && !newCells[z]?.flagged;
              });
              aroundIndexes.forEach((m) => {
                newCells[m] = { ...newCells[m], discover: true };
              });
              indexToRemove.push(c);
              indexToAdd = indexToAdd.concat(aroundIndexes);
            } else {
              newCells[c] = { ...newCells[c], discover: true };
              if (newCells[c].status === "BOMB") {
                setLost(true);
              }
            }
          });
          discoverCellsIndex = discoverCellsIndex.filter(
            (a) => !indexToRemove.includes(a)
          );
          discoverCellsIndex = discoverCellsIndex.concat(indexToAdd);
        } while (discoverCellsIndex.some((j) => newCells[j].status === 0));
        return newCells;
      });
    }
  };

  const handleFlag = (i) => {
    if (!lost) {
      setCells((prev) => {
        let newCells = [...prev];
        if (!newCells[i].discover) {
          if (newCells[i].flagged) {
            newCells[i] = { ...newCells[i], flagged: false };
          } else {
            newCells[i] = { ...newCells[i], flagged: true };
          }
        }
        return newCells;
      });
    }
  };

  const handleReset = () => {
    setCells(initPlateArray(width, height, bombs));
    setLost(false);
    setWin(false);
  };

  const handleSecondChance = () => {
    setLost(false);
  };

  return (
    <div>
      <StyledPlate width={width}>
        {cells.map((cell, i) => (
          <Cell
            key={i}
            index={i}
            cell={cell}
            onDiscover={handleDiscover}
            onFlag={handleFlag}
            lost={lost}
          />
        ))}
      </StyledPlate>
      {lost && <p className="lost">LOOOOOSER</p>}
      {win && <p className="win">GAGNé</p>}
      <button onClick={handleReset}>RESET</button>
      <button onClick={handleSecondChance}>DEUXIEME CHANCE</button>
    </div>
  );
};

const StyledPlate = styled.div`
  display: grid;
  width: ${(p) => p.width * 25}px;
  grid-template-columns: repeat(${(p) => p.width}, 1fr);
  grid-auto-columns: min-content;
  margin-right: 16px;
`;

Plate.propTypes = {};

export default Plate;
