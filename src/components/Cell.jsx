import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

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
    >
      <span>
        {cell.status !== "BOMB"
          ? `${cell.status === 0 ? "" : cell.status}`
          : "B"}
      </span>
    </StyledCell>
  );
};

const StyledCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  user-select: none;
  box-shadow: 0 0 0 1px #2e2e2e;
  background-color: grey;
  cursor: pointer;
  span {
    display: none;
  }
  ${(p) =>
    p.isDiscovered &&
    css`
      background-color: ${p.isBomb ? "red" : "lightgreen"};
      span {
        display: block;
      }
    `}
  ${(p) =>
    p.isFlagged &&
    css`
      background-color: orange;
    `}
`;

Cell.propTypes = {};

export default Cell;
