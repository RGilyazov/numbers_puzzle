import React from "react";
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';

import { clickCell } from './puzzleGameSlice.js';

export default function Cell(props) {
  const { value, color, active, last, deleted } = props.cell;


  const dispatch = useDispatch();

  const ref = useRef();

  useEffect(() => {
    function handleClick(event) {
      dispatch(clickCell(props.cell));
    }   
    const element = ref.current;
    element.addEventListener('click', handleClick);
    return () => {
      element.removeEventListener('click', handleClick);
    };
  }, [props.cell,dispatch]);

  return (
    <div className={`flex justify-center items-center w-[10vmin] h-[10vmin]  ${deleted?'animate-fallDown-cell':''}`}>
       <div ref={ref} 
        className={`${active||deleted ?'animate-shake-cell':''} touch-none select-none box-border rounded-20p text-center flex justify-center items-center text-cell ${active ? "border-2 border-red-400 w-[10vmin] h-[10vmin]" : value?"border-2 border-black w-[9vmin] h-[9vmin]":' border-black w-[9vmin] h-[9vmin]'
          }`}
        style={{ backgroundColor:color}}>
        {value ? value : ''}{last ? '.' : ''}
      </div>

    </div>
  );
}
