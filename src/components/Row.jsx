import React from "react";
import Cell from "./Cell";

export default function Row(props){
  const cells = props.cells.map((cell, index) => (
    <Cell key={index} cell = {cell} />
  ));
  return <div className="flex"> {cells} </div>
}