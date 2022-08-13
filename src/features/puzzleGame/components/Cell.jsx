import React from "react";
import { useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";

export default function Cell(props) {
  const { cell, onClick, onActivate } = props;
  const { value, color, active, last, deleted, activate } = cell;

  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    const handleClick = () => onClick(cell);
    element.addEventListener("click", handleClick);
    return () => {
      element.removeEventListener("click", handleClick);
    };
  }, [cell, onClick]);

  useEffect(() => {
    if (active && activate) {
      onActivate(cell);
      ref.current.scrollIntoView();
    }
  }, [cell, active, activate, onActivate]);

  const textSize = isMobile ? "text-cell" : "text-2xl";
  const cellSize = isMobile ? "w-[10vmin] h-[10vmin]" : "w-10 h-10";
  const firstAnimation = deleted ? "animate-fallDown-cell" : "";
  const secondAnimation = active
    ? "animate-shake-cell"
    : deleted
    ? "animate-shake-cell-2s"
    : "";
  const borderColor = active
    ? "border-2 border-red-400"
    : "border-2 border-black";
  return (
    <div
      className={`${cellSize} ${firstAnimation}
                   flex justify-center items-center p-0.5`}
    >
      <div
        ref={ref}
        className={`${textSize} ${secondAnimation} ${borderColor}
                     shadow-lg touch-manipulation select-none box-border rounded-20p 
                     flex justify-center items-center text-center h-full w-full`}
        style={{ backgroundColor: color }}
      >
        {value}
        {last ? "." : ""}
      </div>
    </div>
  );
}
