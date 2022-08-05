import React from "react";
import Row from "./Row";

export default function Glass(props){
  const {rows, displayStart, displayCount} = props;
  const rowsComps = rows.filter((item,index)=>{return index>=displayStart && index<displayStart+displayCount }).map((row, index) => (
    <Row cells = {row} />
  ));
  return <div className="flex"><div className="flex-col border-2 border-black"> {rowsComps} </div></div>
}
