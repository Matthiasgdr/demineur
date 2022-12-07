import React from "react";
import { initPlateArray, getAroundIndexes } from "../utils/utils";
import { Button, Flex } from "@chakra-ui/react";

import Cell from "../Cell";
import {
  StyledPlate,
  LoseScreen,
  PlateWrapper,
  WinScreen,
} from "./Plate.styles";

const Plate = ({ width, height, bombs }) => {
  const [lost, setLost] = React.useState(true);
  const [win, setWin] = React.useState(false);
  const [cells, setCells] = React.useState(
    initPlateArray(width, height, bombs)
  );

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

  const handleReset = React.useCallback(() => {
    setCells(initPlateArray(width, height, bombs));
    setLost(false);
    setWin(false);
  }, [width, height, bombs]);

  const handleSecondChance = () => {
    setLost(false);
  };

  React.useEffect(() => {
    handleReset();
  }, [width, height, bombs, handleReset]);

  return (
    <div>
      <PlateWrapper>
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
        {lost && (
          <LoseScreen>
            <p>PERDU</p>
            <Flex justify="center">
              <Button mr="4" onClick={handleReset} colorScheme="blue">
                Rééssayer
              </Button>
              <Button onClick={handleSecondChance} colorScheme="blue">
                Seconde chance
              </Button>
            </Flex>
          </LoseScreen>
        )}
        {win && <WinScreen>GAGNÉ</WinScreen>}
      </PlateWrapper>
      <Flex justify="center" p="4">
        <Button mr="4" colorScheme="pink" onClick={handleReset}>
          RESET
        </Button>
        <Button colorScheme="pink" onClick={handleSecondChance}>
          DEUXIEME CHANCE
        </Button>
      </Flex>
    </div>
  );
};

Plate.propTypes = {};

export default Plate;
