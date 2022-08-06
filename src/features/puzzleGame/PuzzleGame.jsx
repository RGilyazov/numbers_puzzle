import React from "react";
import Glass from "./Glass";
import { useDispatch, useSelector } from "react-redux";
import {useEffect,useRef,useCallback} from 'react'
import { addRow } from './puzzleGameSlice.js';

export default function PuzzleGame(props){


  const state = useSelector((state) =>state.puzzleGame);
  const { rows, displayStart, displayCount } = state
      
  return   <div><Glass rows={rows} displayStart={displayStart} displayCount={displayCount} /></div>
}