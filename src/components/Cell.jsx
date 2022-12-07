import React from "react";
import styled, { css, keyframes } from "styled-components";
import bomb from "./utils/bomb.png";
import flag from "./utils/flag.png";

const Cell = ({ index, cell, onDiscover, onFlag }) => {
  const handleDiscover = (index) => {
    if (!cell.flagged) {
      onDiscover(index);
    }
  };

  return (
    <StyledCell
      onClick={() => handleDiscover(index)}
      onContextMenu={(e) => {
        e.preventDefault();
        onFlag(index);
      }}
      isBomb={cell.status === "BOMB"}
      isDiscovered={cell.discover}
      isFlagged={cell.flagged}
      nb={cell.status}
    >
      <p>{getCell(cell.flagged ? "FLAG" : cell.status)}</p>
    </StyledCell>
  );
};

const cligno = keyframes`
  0%{
    background-color: #e86a6a;
  }
  100%{
    background-color: pink;
  }
`;

const getCell = (status) => {
  switch (status) {
    case "BOMB":
      return <img alt="bomb" src={bomb}></img>;
    case "FLAG":
      return <img alt="flag" src={flag}></img>;
    case 0:
      return;
    default:
      return `${status}`;
  }
};

const getColor = (i) => {
  const colors = [
    "#6ed63a",
    "#af1160",
    "#ff4524",
    "#cfb11b",
    "#2f5c83",
    "#27b173",
    "#0b0c60",
    "#786255",
  ];

  return colors[i];
};

const StyledCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  user-select: none;
  box-shadow: 0 0 0 1px #ffffff;
  background-color: #ffb8ca;
  font-weight: 600;
  color: ${(p) => getColor(p.nb)};
  cursor: pointer;
  &:hover {
    animation: ${cligno} 1s infinite alternate;
  }
  p {
    display: none;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 2px;
    box-sizing: border-box;
    img {
      height: 100%;
      width: auto;
    }
  }
  ${(p) =>
    p.isDiscovered &&
    css`
      background-color: ${p.isBomb ? "#e65252" : "#ffe5e5"};
      p {
        display: flex;
      }
    `}
  ${(p) =>
    p.isFlagged &&
    css`
      p {
        display: flex;
      }
    `}
`;

Cell.propTypes = {};

export default Cell;
