import { createSlice } from "@reduxjs/toolkit";
import * as utils from "./puzzleGameUtils";
//import { act } from "react-dom/test-utils";

type StateType = { puzzleGame: PuzzleGameStateType };
type ActionType = { payload: any; type: string };

type PuzzleGameStateType = {
  rows: utils.RowData[];
  displayStart: number;
  displayEnd: number;
  activeCell: utils.CellData & { activate?: boolean };
  lastCell: utils.CellData;
  topRow: utils.RowData;
  scroll: any;
};

const initialRows = utils.getInitialRows();
const initialState: PuzzleGameStateType = {
  rows: initialRows,
  displayStart: 0,
  displayEnd: 0,
  activeCell: utils.emptyCell(),
  lastCell: utils.getLastCell(initialRows),
  topRow: utils.calculateTopRow(initialRows, 0),
  scroll: { top: 0, height: 0, clientHeight: 0 },
};

export const selectPuzzleGame = (state: StateType) => state.puzzleGame;

export const selectActiveCell = (state: StateType) => {
  const puzzleGame = selectPuzzleGame(state);
  return puzzleGame.activeCell;
};
export const selectStateToSave = (state: StateType) => {
  return selectPuzzleGame(state);
};
export const selectLastCell = (state: StateType) => {
  const puzzleGame = selectPuzzleGame(state);
  return puzzleGame.lastCell;
};

export const puzzleGameSlice = createSlice({
  name: "puzzleGame",
  initialState: initialState,
  reducers: {
    cellActivated(state: PuzzleGameStateType, action: ActionType) {
      if (state.activeCell) state.activeCell.activate = false;
    },
    findNextCellToDelete(state: PuzzleGameStateType, action: ActionType) {
      const NextCellToDelete = utils.getNextCellToDelete(state.rows, {
        ...state.activeCell,
      });
      state.activeCell = NextCellToDelete
        ? NextCellToDelete
        : utils.emptyCell();
      const rowInd = utils.getRowIndexById(state.rows, state.activeCell.rowId);
      if (rowInd && (rowInd < state.displayStart || rowInd > state.displayEnd))
        state.activeCell.activate = true;
    },
    saveGame(state: PuzzleGameStateType, action: ActionType) {
      action.payload.success = true;
    },
    loadGame(state: PuzzleGameStateType, action: ActionType) {
      Object.assign(state, action.payload);
      state.topRow = utils.calculateTopRow(state.rows, state.displayStart);
      action.payload.success = true;
    },
    newGame(state: PuzzleGameStateType, action: ActionType) {
      state = { ...state, ...initialState };
    },
    rewrite(state: PuzzleGameStateType, action: ActionType) {
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
    activateCell(state: PuzzleGameStateType, action: ActionType) {
      if (!action.payload.deleted) state.activeCell = action.payload;
      else state.activeCell = utils.emptyCell();
    },
    removeCells(state: PuzzleGameStateType, action: any) {
      utils.removeCell(state.rows, action.payload[0]);
      utils.removeCell(state.rows, action.payload[1]);
      state.activeCell = utils.emptyCell();
      state.topRow = utils.calculateTopRow(state.rows, state.displayStart);
      if (utils.getNextCellToDelete(state.rows) === undefined)
        action.asyncDispatch(puzzleGameSlice.actions.rewrite(null));
    },
    changeScroll(state: PuzzleGameStateType, action: ActionType) {
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
    clickCell(state: PuzzleGameStateType, action: any) {
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

export const _puzzleGameSliceExportedForTesting = {
  initialState,
};
