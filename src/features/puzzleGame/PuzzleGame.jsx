import React from "react";
import Glass from "./Glass";
import Row from "./Row";
import { useDispatch, useSelector } from "react-redux";
import { rewrite } from './puzzleGameSlice.js';

export default function PuzzleGame(props){

  const dispatch = useDispatch();
  const state = useSelector((state) =>state.puzzleGame);
  const {rows,topRow} = state;
  
  function handleButtonClick(){
    dispatch(rewrite())
  }
  return   (
  <div className="">
        <button onClick={handleButtonClick} className = 
                    {'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'} type="button">rewrite
        </button>
        <div className='bg-white border-t-2 border-b-2 rounded w-fit'> 
            <Row id = {topRow.id} cells = {topRow.cells} />
        </div>
        <div>
            <Glass rows={rows} />
        </div>
   </div>)
}