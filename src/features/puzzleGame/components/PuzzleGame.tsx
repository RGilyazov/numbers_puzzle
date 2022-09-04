import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Glass, { ScrollInfo } from "./Glass";
import {
  clickCell,
  cellActivated,
  changeScroll,
  selectActiveCell,
  selectLastCell,
  selectPuzzleGame,
} from "../puzzleGameSlice";
import { CellData } from "../puzzleGameUtils";

export default function PuzzleGame() {
  const state = useSelector(selectPuzzleGame);
  const activeCell = useSelector(selectActiveCell);
  const lastCell = useSelector(selectLastCell);

  const dispatch = useDispatch();

  const handleCellClick = (cell: CellData) => {
    dispatch(clickCell(cell));
  };
  const handleCellActivate = (cell: CellData) => {
    dispatch(cellActivated({}));
  };
  const handleChangeScroll = (scrollInfo: ScrollInfo) => {
    dispatch(changeScroll(scrollInfo));
  };

  useEffect(() => {
    const onUnload = (e: any) => {
      e.preventDefault();
      e.returnValue = "game progress will be lost";
      return e.returnValue;
    };
    window.addEventListener("beforeunload", onUnload);
    return () => {
      window.removeEventListener("beforeunload", onUnload);
    };
  });
  const { rows, topRow } = state;
  return (
    <Glass
      rows={rows}
      activeCell={activeCell}
      lastCell={lastCell}
      topRow={topRow}
      eventHandlers={{
        onCellClick: handleCellClick,
        onCellActivate: handleCellActivate,
        onChangeScroll: handleChangeScroll,
      }}
    />
  );
}
