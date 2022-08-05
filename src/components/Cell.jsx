import React from "react";

export default function Cell(props) {
  const { value, color } = props.cell;
  return (
    <div className="flex justify-center items-center w-10 h-10">
      <div
        className={`box-border rounded-lg w-9 h-9 text-center flex justify-center items-center text-2xl ${
          value ? "border-2 border-black" : "opacity-0"
        }`}
        style={{ backgroundColor: color }}
      >
        {value}
      </div>
    </div>
  );
}

//<div style="display:flex;justify-content:center;align-items:center;">Text Content</div
