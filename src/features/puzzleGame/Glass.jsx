import React from "react";
import Row from "./Row";
import {useEffect,useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { addRow } from './puzzleGameSlice.js';

export default function Glass(props){
 
  const {rows, displayStart, displayCount} = props;
  const rowsComps = rows.filter((item,index)=>{return index>=displayStart && index<displayStart+displayCount }).map((row, index) => (
    <Row key = {row.id} id = {row.id} cells = {row.cells} />
  ));
  return <div className="flex"><div className="flex-col border-2 border-black"> {rowsComps} </div></div>
}
