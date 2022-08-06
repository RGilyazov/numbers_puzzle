import React from "react";
import Cell from "./Cell";
import { useSelector} from 'react-redux';
import { selectActiveCell, selectLastCell} from './puzzleGameSlice.js';

export default function Row(props){
  const activeCell = useSelector(selectActiveCell);
  const lastCell = useSelector(selectLastCell);
  const cells = props.cells.map((cell, index) => {
    const cellData = {...cell}
    cellData.index = index
    cellData.rowId = props.id
    cellData.active = activeCell.index == index & activeCell.rowId == props.id
    cellData.last = lastCell.index == index & lastCell.rowId == props.id
    return <Cell key={index} cell = {cellData}/>
  });
  return <div className="flex"> {cells} </div>
}