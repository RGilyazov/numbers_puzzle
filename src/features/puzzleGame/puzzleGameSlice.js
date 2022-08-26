import { createSlice } from "@reduxjs/toolkit";
import * as utils from "./puzzleGameUtils";
//import { act } from "react-dom/test-utils";

const initialRows = utils.getInitialRows();
const initialState = {
  rows: initialRows,
  displayStart: 0,
  displayEnd: 0,
  activeCell: utils.emptyCell(),
  lastCell: utils.getLastCell(initialRows),
  topRow: utils.calculateTopRow(initialRows, 0),
  scroll: { top: 0, height: 0, clientHeight: 0 },
};

export const selectPuzzleGame = (state) => state.puzzleGame;

export const selectActiveCell = (state) => {
  const puzzleGame = selectPuzzleGame(state);
  return puzzleGame.activeCell;
};
export const selectStateToSave = (state) => {
  return selectPuzzleGame(state);
};
export const selectLastCell = (state) => {
  const puzzleGame = selectPuzzleGame(state);
  return puzzleGame.lastCell;
};

export const puzzleGameSlice = createSlice({
  name: "puzzleGame",
  initialState: initialState,
  reducers: {
    cellActivated(state, action) {
      state.activeCell.activate = false;
    },
    findNextCellToDelete(state, action) {
      state.activeCell = utils.getNextCellToDelete(state.rows, {
        ...state.activeCell,
      });
      if (state.activeCell === undefined)
        state.activeCell = utils.emptyCell();
      const rowInd = utils.getRowIndexById(state.rows, state.activeCell.rowId);
      if (rowInd < state.displayStart || rowInd > state.displayEnd)
        state.activeCell.activate = true;
    },
    saveGame(state, action) {
      action.success = true;
    },
    loadGame(state, action) {
      Object.assign(state, action.payload);
      state.topRow = utils.calculateTopRow(state.rows, state.displayStart);
      action.success = true;
    },
    newGame(state, action) {
      for (let i in initialState) state[i] = initialState[i];
    },
    rewrite(state, action) {
      state.rows = utils.removeEmptyRows(state.rows);
      const rows = state.rows;
      const newValues = [];
      for (let rowInd = 0; rowInd < rows.length; rowInd++) {
        let cells = rows[rowInd].cells;
        for (let cellInd = 0; cellInd < cells.length; cellInd++) {
          if (!cells[cellInd].deleted) newValues.push(cells[cellInd].value);
        }
      }
      newValues.forEach((value) => utils.addCell(rows, value));
      state.lastCell = utils.getLastCell(rows);
    },
    activateCell(state, action) {
      if (!action.payload.deleted) state.activeCell = action.payload;
      else state.activeCell = utils.emptyCell();
    },
    removeCells(state, action) {
      utils.removeCell(state.rows, action.payload[0]);
      utils.removeCell(state.rows, action.payload[1]);
      state.activeCell = utils.emptyCell();
      state.topRow = utils.calculateTopRow(state.rows, state.displayStart);
      if (utils.getNextCellToDelete(state.rows) === undefined)
        action.asyncDispatch(puzzleGameSlice.actions.rewrite());
    },
    changeScroll(state, action) {
      const { scrollTop, scrollHeight, clientHeight } = action.payload;
      state.scroll.height = scrollHeight;
      state.scroll.top = scrollTop;
      state.scroll.clientHeight = clientHeight;
      const displayStart = Math.round(
        (scrollTop / scrollHeight) * state.rows.length - 0.25
      );
      state.displayEnd = Math.round(
        ((scrollTop + clientHeight) / scrollHeight) * state.rows.length - 0.25
      );
      if (displayStart !== state.displayStart) {
        state.displayStart = displayStart;
        state.topRow = utils.calculateTopRow(state.rows, displayStart);
      }
    },
    clickCell(state, action) {
      const cell = utils.getCell(state.rows, action.payload);
      const activeCell = utils.getCell(state.rows, { ...state.activeCell });
      if (utils.canRemoveCells(state.rows, cell, activeCell))
        action.asyncDispatch(
          puzzleGameSlice.actions.removeCells([cell, activeCell])
        );
      else action.asyncDispatch(puzzleGameSlice.actions.activateCell(cell));
    },
  },
});
export const {
  activateCell,
  clickCell,
  rewrite,
  changeScroll,
  newGame,
  saveGame,
  loadGame,
  findNextCellToDelete,
  cellActivated,
} = puzzleGameSlice.actions;

export default puzzleGameSlice.reducer;
