import React from "react";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { clickCell } from "./puzzleGameSlice.js";
import { isMobile } from "react-device-detect";

export default function Cell(props) {
  const { value, color, active, last, deleted } = props.cell;

  const dispatch = useDispatch();

  const ref = useRef();

  useEffect(() => {
    function handleClick(event) {
      dispatch(clickCell(props.cell));
    }
    const element = ref.current;
    element.addEventListener("click", handleClick);
    return () => {
      element.removeEventListener("click", handleClick);
    };
  }, [props.cell, dispatch]);

  const textSize = isMobile ? "text-cell" : "text-2xl";
  const cellSize = isMobile ? "w-[10vmin] h-[10vmin]" : "w-10 h-10";

  return (
    <div
      className={`flex justify-center items-center ${cellSize} p-0.5 ${
        deleted ? "animate-fallDown-cell" : ""
      }`}
    >
      <div
        ref={ref}
        className={`${
          active ? "animate-shake-cell" : deleted ? "animate-shake-cell-2s" : ""
        } 
                    ${
                      active
                        ? "border-2 border-red-400"
                        : value
                        ? "border-2 border-black"
                        : ""
                    }
                     shadow-lg touch-manipulation select-none box-border rounded-20p 
                     flex justify-center items-center text-center ${textSize} h-full w-full`}
        style={{ backgroundColor: color }}
      >
        {value ? value : ""}
        {last ? "." : ""}
      </div>
    </div>
  );
}
