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

export function getInitialRows() {
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
export function emptyActiveCell() {
  return { index: -1, rowId: -1 };
}

export function getLastCell(rows) {
  const row = rows[rows.length - 1];
  return { index: row.cells.length - 1, rowId: row.id };
}

export function calculateTopRow(rows, displayStart) {
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

export function getRowIndexById(rows, id) {
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].id === id) return i;
  }
}
function canRemoveValues(value1, value2) {
  return value1 === value2 || value1 + value2 === 10;
}

export function canRemoveCells(rows, cell1, cell2) {
  if (cell1.value === undefined || cell2.value === undefined) return false;
  if (cell1.deleted || cell2.deleted) return false;
  if (!canRemoveValues(cell1.value, cell2.value)) return false;

  const rowIndex1 = getRowIndexById(rows, cell1.rowId);
  const rowIndex2 = getRowIndexById(rows, cell2.rowId);

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
export function removeCell(rows, cell) {
  const rowInd = getRowIndexById(rows, cell.rowId);
  rows[rowInd].cells[cell.index].deleted = true;
}

export function getCell(rows, cell) {
  const rowInd = getRowIndexById(rows, cell.rowId);
  if (rowInd === undefined) return cell;
  return {
    ...rows[rowInd].cells[cell.index],
    index: cell.index,
    rowId: cell.rowId,
  };
}
export function addCell(rows, value) {
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

export function getNextCellToDelete(rows, cell = undefined) {
  if (cell === undefined) cell = emptyActiveCell();
  let [i, j] = getNextCell(rows, getRowIndexById(rows, cell.rowId), cell.index);

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

export function removeEmptyRows(rows) {
  return rows.filter((row) => !rowIsEmpty(row));
}
