import React from "react";
import Cell from "./Cell";

export default function Row(props) {
  const activeCell = props.activeCell;
  const lastCell = props.lastCell;
  const cells = props.cells.map((cell, index) => {
    let cellData = { ...cell };
    cellData.index = index;
    if (cellData?.rowId === undefined) cellData.rowId = props.id;
    cellData.active =
      props.activeCell &&
      activeCell.index === index &&
      activeCell.rowId === cellData.rowId;
    cellData.last =
      props.lastCell &&
      lastCell.index === index &&
      lastCell.rowId === cellData.rowId;
    cellData.activate =
      props.activeCell && activeCell.activate === true && cellData.active;
    return (
      <Cell
        key={index}
        cell={cellData}
        onClick={props.eventHandlers.onCellClick}
        onActivate={props.eventHandlers.onCellActivate}
      />
    );
  });
  return <div className="flex"> {cells} </div>;
}
