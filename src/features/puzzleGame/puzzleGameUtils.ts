//number of columns of the game
const NUM_COLS = 9;

//colors for cells with different values
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

export type Cell = {
  value: number;
  color: string;
  deleted: boolean;
  rowId: number;
  index: number;
};
export type Row = { id: number; cells: Cell[] };

let lastRowId = 0; //incremental row id

/**
 * creates new row with new unique rowId
 * @param cells cells to be added to the row
 * @returns new row
 */
function createRow(cells: Cell[] = []): Row {
  lastRowId += 1;
  return { id: lastRowId, cells: cells };
}

/**
 * returns new cell object
 * @param value
 * @param rowId
 * @param index
 * @returns Cell
 */
function getNewCell(value: number, rowId: number, index: number): Cell {
  return {
    value: value,
    color: COLORS[value - 1],
    deleted: value === 0,
    rowId,
    index,
  };
}

/**
 * returns initial rows (rows from which game starts)
 * @returns
 */
export function getInitialRows() {
  const initialNums: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8,
    1, 9,
  ];
  const rows: Row[] = [];
  let cells: Cell[] = [];
  for (let ind = 0; ind < initialNums.length; ind++) {
    cells.push(getNewCell(initialNums[ind], lastRowId + 1, cells.length)); //stop using lastRowId after convert to ts
    if (cells.length === NUM_COLS || ind === initialNums.length - 1) {
      rows.push(createRow(cells));
      cells = [];
    }
  }
  return rows;
}

/**
 * returns empty cell which are not part of game rows.
 */
export function emptyCell(): Cell {
  return { index: -1, rowId: -1, value: 0, color: "", deleted: false };
}

/**
 * returns index and id of last last cell in game rows array,
 * additional information could be retrieved with getCell function
 * @param rows - game rows array
 * @returns - index and id of last last cell in game rows array.
 */
export function getLastCell(rows: Row[]): { index: number; rowId: number } {
  const row = rows[rows.length - 1];
  return { index: row.cells.length - 1, rowId: row.id };
}

/**
 * when many rows on screen they could not be shown all at once
 * to make user life easier top row could be showed
 * it depends of scroll position (i.e. row from which cells are on the screen)
 * this function calculate top row for given display start position
 *
 * @param rows - game rows array
 * @param displayStart - index of the first row which shown on the screen
 * @returns - top row. row which not present in game rows array,
 * but every cell of the row is calculated independently.
 */

export function calculateTopRow(rows: Row[], displayStart: number) {
  const row = createRow();
  row.id = -100;
  for (let i = 0; i < NUM_COLS; i++) {
    for (let j = displayStart - 1; j >= -1; j--) {
      if (j === -1) {
        row.cells.push(getNewCell(0, -1, -1));
        break;
      } else if (!rows[j].cells[i].deleted) {
        const { value, rowId, index } = rows[j].cells[i];
        let cell = getNewCell(value, rowId, index);
        cell.rowId = rows[j].id;
        row.cells.push(cell);
        break;
      }
    }
  }
  return row;
}

/**
 * finds index of the row by row id
 *
 * @param rows - game rows array
 * @param id - row id
 * @returns - row index
 */
export function getRowIndexById(rows: Row[], id: number) {
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].id === id) return i;
  }
  return undefined; //explicitly return undefined
}

/**
 *check if values could be removed according to game rules (equal or sum = 10)
 * @param value1
 * @param value2
 * @returns - true if values could be removed
 */
function canRemoveValues(value1: number, value2: number) {
  return value1 === value2 || value1 + value2 === 10;
}

/**
 * Checks if two cells could be removed according to game rules
 *       Only neighboring cells with equal values or
 *       with values which sum is equal to 10 can be removed. Cells in the same
 *       row or in the same column considered neighboring if there are no other
 *       cells between them. Blocks that are located one by one from left to
 *        right and from top to bottom also considered neighboring
 * @param rows - game rows array
 * @param cell1 - cell to be removed
 * @param cell2 - cell to be removed
 * @returns - returns true if cells can be removed according to game rules
 */
export function canRemoveCells(rows: Row[], cell1: Cell, cell2: Cell) {
  //if value is undefined it is not a real cell (could be empty acitve cell for example)
  if (cell1.value === undefined || cell2.value === undefined) return false;

  //already deleted cells could not be deleted again
  if (cell1.deleted || cell2.deleted) return false;

  //check if cells have values that could be removed (equal or sum = 10)
  if (!canRemoveValues(cell1.value, cell2.value)) return false;

  const rowIndex1 = getRowIndexById(rows, cell1.rowId);
  const rowIndex2 = getRowIndexById(rows, cell2.rowId);
  if (rowIndex1 === undefined || rowIndex2 === undefined) return false;

  //if cell1 and cell2 actually same cell it could not be removed
  if (cell1.index === cell2.index && cell1.rowId === cell2.rowId) return false;

  //cells in one column, need to check that only deleted cells in between
  if (cell1.rowId === cell2.rowId) {
    const rowIndex = rowIndex1;
    const minIndex = Math.min(cell1.index, cell2.index);
    const maxIndex = Math.max(cell1.index, cell2.index);
    for (let i = minIndex + 1; i < maxIndex; i++) {
      if (!rows[rowIndex].cells[i].deleted) return false;
    }
    return true;
  }

  //cells in one row, need to check that only deleted cells in between
  if (cell1.index === cell2.index) {
    const index = cell1.index;
    const minRowIndex = Math.min(rowIndex1, rowIndex2);
    const maxRowIndex = Math.max(rowIndex1, rowIndex2);
    for (let i = minRowIndex + 1; i < maxRowIndex; i++) {
      if (!rows[i].cells[index].deleted) return false;
    }
    return true;
  }

  //cells in different rows and columns can be removed only if on cell is right after another
  //with possible deleted cells in between
  const [startCell, endCell] =
    rowIndex1 < rowIndex2 ? [cell1, cell2] : [cell2, cell1];
  const [startRow, endRow] =
    rowIndex1 < rowIndex2 ? [rowIndex1, rowIndex2] : [rowIndex2, rowIndex1];
  let i = startRow;
  let j = startCell.index + 1;
  while (i < endRow || j < endCell.index) {
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

/**
 * remove cell from game rows array
 * @param rows game rows array
 * @param cell cell to remove
 */
export function removeCell(rows: Row[], cell: Cell) {
  const rowInd = getRowIndexById(rows, cell.rowId);
  if (rowInd !== undefined) rows[rowInd].cells[cell.index].deleted = true;
  else throw new Error(`Not found row to remove cell ${cell.rowId}`);
}

/**
 * retrieves cell data from game rows array
 * @param rows game rows array
 * @param cell coordinates of cell
 * @returns all cell data stored in row object or empty cell if cell not found
 */
export function getCell(
  rows: Row[],
  cell: { rowId: number; index: number }
): Cell | undefined {
  const rowInd = getRowIndexById(rows, cell.rowId);
  if (rowInd === undefined) return emptyCell();
  return {
    ...rows[rowInd].cells[cell.index],
    index: cell.index,
    rowId: cell.rowId,
  };
}

/**
 * adds cell to the end of the rows, create new row if last row is full
 *
 * @param rows game rows array
 * @param value value if the cell
 */
export function addCell(rows: Row[], value: number) {
  let row = rows[rows.length - 1];
  let cells = rows[rows.length - 1].cells;
  if (row.cells.length === NUM_COLS) {
    row = createRow();
    rows.push(row);
    cells = row.cells;
  }
  cells.push(getNewCell(value, row.id, cells.length));
}

/**
 * return indexes of the cell which is next to [cell_row,cell_col]
 *
 * @param rows game rows array
 * @param cell_row row index of the cell
 * @param cell_col index of the cell
 * @returns returns indexes of next cell or [] if there is no next cell
 */
function getNextCell(
  rows: Row[],
  cell_row: number | undefined = undefined,
  cell_col: number | undefined = undefined
): [number, number] | [] {
  if (cell_row === undefined || cell_col === undefined) return [0, 0];
  if (cell_col < rows[cell_row].cells.length - 1)
    return [cell_row, cell_col + 1];
  if (cell_row < rows.length - 1) return [cell_row + 1, 0];
  return [];
}

/**
 * check if cell [cell_row,cell_coll] can be deleted according to rules of the game
 * @param rows game rows array
 * @param cell_row row index of the cell to check
 * @param cell_col index of the cell to check
 * @returns true of cell can be deleted, false otherwise
 */
function canRemoveCell(
  rows: Row[],
  cell_row: number,
  cell_col: number
): boolean {
  //if cell already deleted it could not be deleted again
  if (rows[cell_row].cells[cell_col].deleted) return false;

  //check only forward and bottom directions

  //find next cell which are not deleted
  //(it cold be on the same row or not, if in current row all next cells are deleted)
  let [i, j] = getNextCell(rows, cell_row, cell_col);
  while (j !== undefined && i !== undefined && rows[i].cells[j].deleted)
    [i, j] = getNextCell(rows, i, j);

  //if there is one and it has right value to be removed we can delete cell
  if (
    j !== undefined &&
    i !== undefined &&
    canRemoveValues(
      rows[cell_row].cells[cell_col].value,
      rows[i].cells[j].value
    )
  )
    return true;

  //check if in the same column first not deleted cell below has right value to delete
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

  //candidates to delete not found
  return false;
}

/**
 * find cell which could be deleted according to rules of the game stating from StartingCell
 *
 * @param rows - game rows array, rows to find a cell
 * @param StartingCell - cell from which
 * @returns next cell which can be deleted or 'undefined' if there is no such cells
 */
export function getNextCellToDelete(
  rows: Row[],
  StartingCell?: { index: number; rowId: number }
): Cell | undefined {
  if (StartingCell === undefined) StartingCell = emptyCell();
  let [i, j] = getNextCell(
    rows,
    getRowIndexById(rows, StartingCell.rowId),
    StartingCell.index
  );

  while (i !== undefined && j !== undefined) {
    if (canRemoveCell(rows, i, j))
      return { ...rows[i].cells[j], index: j, rowId: rows[i].id };
    [i, j] = getNextCell(rows, i, j);
  }
  return undefined;
}

/**
 * checks if row is empty or not. empty rows could be safely deleted because they do not affect the game
 *
 * @param row - row to check is it empty or not
 * @returns - true if row contains only empty cells, false otherwise
 */
function rowIsEmpty(row: Row): boolean {
  return row.cells.filter((cell) => !cell.deleted).length === 0;
}

export function removeEmptyRows(rows: Row[]) {
  return rows.filter((row) => !rowIsEmpty(row));
}
