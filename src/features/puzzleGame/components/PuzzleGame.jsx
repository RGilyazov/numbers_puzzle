import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Glass from "./Glass";
import Layout from "../../../common/Layout";
import {
  clickCell,
  cellActivated,
  changeScroll,
  selectActiveCell,
  selectLastCell,
} from "../puzzleGameSlice.js";

export default function PuzzleGame() {
  const state = useSelector((state) => state.puzzleGame);
  const activeCell = useSelector(selectActiveCell);
  const lastCell = useSelector(selectLastCell);

  const dispatch = useDispatch();

  const handleCellClick = (cell) => {
    dispatch(clickCell(cell));
  };
  const handleCellActivate = (cell) => {
    dispatch(cellActivated());
  };
  const handleChangeScroll = (scrollInfo) => {
    dispatch(changeScroll(scrollInfo));
  };

  useEffect(() => {
    const onUnload = (e) => {
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
    <Layout
      children={[
        <Glass
          key="1"
          rows={rows}
          activeCell={activeCell}
          lastCell={lastCell}
          topRow={topRow}
          eventHandlers={{
            onCellClick: handleCellClick,
            onCellActivate: handleCellActivate,
            onChangeScroll: handleChangeScroll,
          }}
        />,
      ]}
    ></Layout>
  );
}
