import React from "react";
import Glass from "./Glass";
import {useSelector } from "react-redux";


export default function PuzzleGame(props){

  const state = useSelector((state) =>state.puzzleGame);
  const {rows,topRow} = state;
  
  return   (
  <div className="flex justify-center">
        <Glass rows={rows} topRow={topRow} />
   </div>)
}