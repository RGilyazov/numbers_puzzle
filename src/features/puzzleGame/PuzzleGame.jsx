import React from "react";
import Glass from "./Glass";
import { useDispatch, useSelector } from "react-redux";
import {useEffect,useRef,useCallback} from 'react'
import { rewrite } from './puzzleGameSlice.js';

export default function PuzzleGame(props){

  const dispatch = useDispatch();
  const state = useSelector((state) =>state.puzzleGame);
  const { rows, displayStart, displayCount } = state
  
  function handleButtonClick(){
    dispatch(rewrite())
  }

  return   <div><Glass rows={rows} displayStart={displayStart} displayCount={displayCount} />
                <button onClick={handleButtonClick} className = {'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'} type="button">rewrite</button>
           </div>
}