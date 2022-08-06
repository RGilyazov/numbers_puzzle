import { createSlice } from "@reduxjs/toolkit";

const NUM_COLS = 9;
const COLORS = [
  "rgba(255, 225, 225, 1)",
  "rgba(225, 255, 225, 1)",
  "rgba(225, 225, 255, 1)",
  "rgba(255, 255, 160, 1)",
  "rgba(255, 210, 80, 1)",
  "rgba(240, 240, 120, 1)",
  "rgba(200, 200, 230, 1)",
  "rgba(200, 230, 200, 1)",
  "rgba(230, 200,200, 1)",
];

let lastRowId = 0;
function createRow(cells = []) {
  lastRowId += 1;
  console.log(lastRowId);
  return { myrowID: lastRowId, id: lastRowId, cells: cells };
}
function getNewCell(value) {
  return { value: value, color: COLORS[value - 1] };
}

function getInitialRows() {
  const inintialNums = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8,
    1, 9,
  ];
  const rows = [];
  let cells = [];
  for (let ind = 0; ind < inintialNums.length; ind++) {
    cells.push(getNewCell(inintialNums[ind]));
    if (cells.length == NUM_COLS || ind == inintialNums.length - 1) {
      rows.push(createRow(cells));
      cells = [];
    }
  }
  return rows;
}
function emptyActiveCell() {
  return { index: -1, rowId: -1 };
}

function getLastCell(rows) {
  const row = rows[rows.length - 1];
  return { index: row.cells.length - 1, rowId: row.id };
}

const inintialRows = getInitialRows();
const initialState = {
  rows: inintialRows,
  displayStart: 0,
  displayCount: 2000,
  activeCell: emptyActiveCell(),
  lastCell: getLastCell(inintialRows),
};

export const selectPuzzleGame = (state) => state.puzzleGame;

export const selectActiveCell = (state) => {
  const puzzleGame = selectPuzzleGame(state);
  return puzzleGame.activeCell;
};
export const selectLastCell = (state) => {
  const puzzleGame = selectPuzzleGame(state);
  return puzzleGame.lastCell;
};

function GetRowIndexById(rows, id) {
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].id == id) return i;
  }
}
function canRemoveCells(rows, cell1, cell2) {
  if ((cell1.value != cell2.value) & (cell1.value + cell2.value != 10))
    return false;
  if ((cell1.index == cell2.index) & (cell1.rowId == cell2.rowId)) return false;
  if (cell1.rowId == cell2.rowId) {
    const rowIndex = GetRowIndexById(rows, cell1.rowId);
    const minIndex = Math.min(cell1.index, cell2.index);
    const maxIndex = Math.max(cell1.index, cell2.index);
    for (let i = minIndex + 1; i < maxIndex; i++) {
      if (rows[rowIndex].cells[i].value != 0) return false;
    }
    return true;
  }
  if (cell1.index == cell2.index) {
    const index = cell1.index;
    const rowIndex1 = GetRowIndexById(rows, cell1.rowId);
    const rowIndex2 = GetRowIndexById(rows, cell2.rowId);
    const minRowIndex = Math.min(rowIndex1, rowIndex2);
    const maxRowIndex = Math.max(rowIndex1, rowIndex2);
    for (let i = minRowIndex + 1; i < maxRowIndex; i++) {
      if (rows[i].cells[index].value != 0) return false;
    }
    return true;
  }
  return false;
}
function removeCell(rows, cell) {
  const rowInd = GetRowIndexById(rows, cell.rowId);
  rows[rowInd].cells[cell.index].value = 0;
}

function getCell(rows, cell) {
  const rowInd = GetRowIndexById(rows, cell.rowId);
  if (rowInd == undefined) return cell;
  return {
    ...rows[rowInd].cells[cell.index],
    index: cell.index,
    rowId: cell.rowId,
  };
}
function addCell(rows, value) {
  let cells = rows[rows.length - 1].cells;
  if (cells.length == NUM_COLS) {
    const row = createRow();
    rows.push(row);
    cells = row.cells;
  }
  cells.push(getNewCell(value));
}

export const puzzleGameSlice = createSlice({
  name: "puzzleGame",
  initialState: initialState,
  reducers: {
    addRow(state, action) {
      state.rows.push(getInitialRows()[0]);
    },
    rewrite(state, action) {
      const rows = state.rows;
      const newValues = [];
      for (let rowInd = 0; rowInd < rows.length; rowInd++) {
        let cells = rows[rowInd].cells;
        for (let cellInd = 0; cellInd < cells.length; cellInd++) {
          if (cells[cellInd].value) newValues.push(cells[cellInd].value);
        }
      }
      newValues.forEach((value) => addCell(rows, value));
      state.lastCell = getLastCell(rows);
    },
    activateCell(state, action) {
      if (action.payload.value) state.activeCell = action.payload;
      else state.activeCell = emptyActiveCell();
    },
    removeCells(state, action) {
      removeCell(state.rows, action.payload[0]);
      removeCell(state.rows, action.payload[1]);
      state.activeCell = emptyActiveCell();
    },
    clickCell(state, action) {
      const cell = getCell(state.rows, action.payload);
      const activeCell = getCell(state.rows, { ...state.activeCell });
      if (canRemoveCells(state.rows, cell, activeCell))
        action.asyncDispatch(
          puzzleGameSlice.actions.removeCells([cell, activeCell])
        );
      else action.asyncDispatch(puzzleGameSlice.actions.activateCell(cell));
    },
  },
});
export const { addRow, activateCell, clickCell, rewrite } =
  puzzleGameSlice.actions;

export default puzzleGameSlice.reducer;
