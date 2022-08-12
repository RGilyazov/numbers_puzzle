import React from "react";
import Cell from "./Cell";
import { useSelector } from "react-redux";
import { selectActiveCell, selectLastCell } from "./puzzleGameSlice.js";

export default function Row(props) {
  const activeCell = useSelector(selectActiveCell);
  const lastCell = useSelector(selectLastCell);
  const cells = props.cells.map((cell, index) => {
    let cellData = { ...cell };
    cellData.index = index;
    if (cellData?.rowId === undefined) cellData.rowId = props.id;
    cellData.active =
      (activeCell.index === index) & (activeCell.rowId === cellData.rowId);
    cellData.last =
      (lastCell.index === index) & (lastCell.rowId === cellData.rowId);
    cellData.activate = (activeCell.activate === true) & cellData.active;
    return <Cell key={index} cell={cellData} />;
  });
  return <div className="flex"> {cells} </div>;
}
