import React from "react";
import Glass from "./Glass";
import { useSelector } from "react-redux";
import Menu from "./Menu";

export default function PuzzleGame() {
  const state = useSelector((state) => state.puzzleGame);
  const { rows, topRow } = state;

  return (
    <div className="flex  h-full justify-center">
      <div className="flex-col h-full flex shrink">
        <Menu />
        <Glass rows={rows} topRow={topRow} />
      </div>
    </div>
  );
}
