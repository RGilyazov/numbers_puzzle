import { createSlice } from "@reduxjs/toolkit";
//import { act } from "react-dom/test-utils";

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
  return { myrowID: lastRowId, id: lastRowId, cells: cells };
}

function getNewCell(value) {
  return { value: value, color: COLORS[value - 1], deleted: value === 0 };
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
    if (cells.length === NUM_COLS || ind === inintialNums.length - 1) {
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
  displayEnd: 0,
  activeCell: emptyActiveCell(),
  lastCell: getLastCell(inintialRows),
  topRow: calculateTopRow(inintialRows, 0),
  scroll: { top: 0, height: 0, clientHeigh: 0 },
};

function calculateTopRow(rows, displayStart) {
  const row = createRow();
  row.id = -100;
  for (let i = 0; i < NUM_COLS; i++) {
    for (let j = displayStart - 1; j >= -1; j--) {
      if (j === -1) {
        row.cells.push(getNewCell(0));
        break;
      } else if (!rows[j].cells[i].deleted) {
        let cell = getNewCell(rows[j].cells[i].value);
        cell.rowId = rows[j].id;
        row.cells.push(cell);
        break;
      }
    }
  }
  return row;
}

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

function GetRowIndexById(rows, id) {
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].id === id) return i;
  }
}
function canRemoveValues(value1, value2) {
  return value1 === value2 || value1 + value2 === 10;
}

function canRemoveCells(rows, cell1, cell2) {
  if (cell1.value === undefined || cell2.value === undefined) return false;
  if (cell1.deleted || cell2.deleted) return false;
  if (!canRemoveValues(cell1.value, cell2.value)) return false;

  const rowIndex1 = GetRowIndexById(rows, cell1.rowId);
  const rowIndex2 = GetRowIndexById(rows, cell2.rowId);

  if (cell1.index === cell2.index && cell1.rowId === cell2.rowId) return false;
  if (cell1.rowId === cell2.rowId) {
    const rowIndex = rowIndex1;
    const minIndex = Math.min(cell1.index, cell2.index);
    const maxIndex = Math.max(cell1.index, cell2.index);
    for (let i = minIndex + 1; i < maxIndex; i++) {
      if (!rows[rowIndex].cells[i].deleted) return false;
    }
    return true;
  }
  if (cell1.index === cell2.index) {
    const index = cell1.index;
    const minRowIndex = Math.min(rowIndex1, rowIndex2);
    const maxRowIndex = Math.max(rowIndex1, rowIndex2);
    for (let i = minRowIndex + 1; i < maxRowIndex; i++) {
      if (!rows[i].cells[index].deleted) return false;
    }
    return true;
  }

  const [startCell, endCell] =
    rowIndex1 < rowIndex2 ? [cell1, cell2] : [cell2, cell1];
  const [startRow, endrow] =
    rowIndex1 < rowIndex2 ? [rowIndex1, rowIndex2] : [rowIndex2, rowIndex1];
  let i = startRow;
  let j = startCell.index + 1;
  while (i < endrow || j < endCell.index) {
    if (j >= NUM_COLS) {
      j = 0;
      i += 1;
      continue;
    }
    if (!rows[i].cells[j].deleted) return false;
    j += 1;
  }
  return true;
}
function removeCell(rows, cell) {
  const rowInd = GetRowIndexById(rows, cell.rowId);
  rows[rowInd].cells[cell.index].deleted = true;
}

function getCell(rows, cell) {
  const rowInd = GetRowIndexById(rows, cell.rowId);
  if (rowInd === undefined) return cell;
  return {
    ...rows[rowInd].cells[cell.index],
    index: cell.index,
    rowId: cell.rowId,
  };
}
function addCell(rows, value) {
  let cells = rows[rows.length - 1].cells;
  if (cells.length === NUM_COLS) {
    const row = createRow();
    rows.push(row);
    cells = row.cells;
  }
  cells.push(getNewCell(value));
}

function getNextCell(rows, i = undefined, j = undefined) {
  if (i === undefined || j === undefined) return [0, 0];
  if (j < rows[i].cells.length - 1) return [i, j + 1];
  if (i < rows.length - 1) return [i + 1, 0];
  return [undefined, undefined];
}

function canRemoveCell(rows, cell_row, cell_col) {
  if (rows[cell_row].cells[cell_col].deleted) return false;
  //check only forward and bottom directions
  let [i, j] = getNextCell(rows, cell_row, cell_col);
  while (i !== undefined && rows[i].cells[j].deleted)
    [i, j] = getNextCell(rows, i, j);
  if (
    i !== undefined &&
    canRemoveValues(
      rows[cell_row].cells[cell_col].value,
      rows[i].cells[j].value
    )
  )
    return true;
  [i, j] = [cell_row + 1, cell_col];
  while (
    i < rows.length &&
    j < rows[i].cells.length &&
    rows[i].cells[j].deleted
  )
    i += 1;
  if (
    i < rows.length &&
    j < rows[i].cells.length &&
    canRemoveValues(
      rows[cell_row].cells[cell_col].value,
      rows[i].cells[j].value
    )
  )
    return true;
  return false;
}

function getNextCellToDelete(rows, cell = undefined) {
  if (cell === undefined) cell = emptyActiveCell();
  let [i, j] = getNextCell(rows, GetRowIndexById(rows, cell.rowId), cell.index);

  while (i !== undefined) {
    if (canRemoveCell(rows, i, j))
      return { ...rows[i].cells[j], index: j, rowId: rows[i].id };
    [i, j] = getNextCell(rows, i, j);
  }
  return undefined;
}

function rowIsEmpty(row) {
  return row.cells.filter((cell) => !cell.deleted).length === 0;
}

function removeEmptyRows(rows) {
  return rows.filter((row) => !rowIsEmpty(row));
}

export const puzzleGameSlice = createSlice({
  name: "puzzleGame",
  initialState: initialState,
  reducers: {
    cellActivated(state, action) {
      state.activeCell.activated = false;
    },
    findNextCellToDelete(state, action) {
      state.activeCell = getNextCellToDelete(state.rows, {
        ...state.activeCell,
      });
      if (state.activeCell === undefined) state.activeCell = emptyActiveCell();
      const rowInd = GetRowIndexById(state.rows, state.activeCell.rowId);
      if (rowInd < state.displayStart || rowInd > state.displayEnd)
        state.activeCell.activate = true;
    },
    saveGame(state, action) {
      action.success = true;
    },
    loadGame(state, action) {
      Object.assign(state, action.payload);
      action.success = true;
    },
    newGame(state, action) {
      for (let i in initialState) state[i] = initialState[i];
    },
    rewrite(state, action) {
      state.rows = removeEmptyRows(state.rows);
      const rows = state.rows;
      const newValues = [];
      for (let rowInd = 0; rowInd < rows.length; rowInd++) {
        let cells = rows[rowInd].cells;
        for (let cellInd = 0; cellInd < cells.length; cellInd++) {
          if (!cells[cellInd].deleted) newValues.push(cells[cellInd].value);
        }
      }
      newValues.forEach((value) => addCell(rows, value));
      state.lastCell = getLastCell(rows);
    },
    activateCell(state, action) {
      if (!action.payload.deleted) state.activeCell = action.payload;
      else state.activeCell = emptyActiveCell();
    },
    removeCells(state, action) {
      removeCell(state.rows, action.payload[0]);
      removeCell(state.rows, action.payload[1]);
      state.activeCell = emptyActiveCell();
      state.topRow = calculateTopRow(state.rows, state.displayStart);
      if (getNextCellToDelete(state.rows) === undefined)
        action.asyncDispatch(puzzleGameSlice.actions.rewrite());
    },
    changeScroll(state, action) {
      const { scrollTop, scrollHeight, clientHeight } = action.payload;
      state.scroll.height = scrollHeight;
      state.scroll.top = scrollTop;
      state.scroll.clientHeight = clientHeight;
      console.log({ ...state.scroll });

      const displayStart = Math.round(
        (scrollTop / scrollHeight) * state.rows.length - 0.25
      );
      state.displayEnd = Math.round(
        ((scrollTop + clientHeight) / scrollHeight) * state.rows.length - 0.25
      );
      if (displayStart !== state.displayStart) {
        state.displayStart = displayStart;
        state.topRow = calculateTopRow(state.rows, displayStart);
      }
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
