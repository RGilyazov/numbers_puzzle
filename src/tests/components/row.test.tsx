import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Row from "../../features/puzzleGame/components/Row";
import {
  _puzzleGameUtilsExportedForTesting,
  RowData,
  CellData,
} from "../../features/puzzleGame/puzzleGameUtils";

function getTestRow() {
  const { getNewCell } = _puzzleGameUtilsExportedForTesting;
  const initialNums: number[] = [1, 2, 3, 4, 5, 6, 7, 7];
  const cells: CellData[] = [];
  const row: RowData = { id: 1, cells: cells };
  for (let ind = 0; ind < initialNums.length; ind++) {
    row.cells.push(getNewCell(initialNums[ind], row.id, row.cells.length));
  }

  return row;
}

test("renders Row", () => {
  const row = getTestRow();
  render(<Row cells={row.cells} id={row.id} />);
  let element = screen.getByText("1");
  expect(element).toBeInTheDocument();
  element = screen.getByText("2");
  expect(element).toBeInTheDocument();
  element = screen.getByText("3");
  expect(element).toBeInTheDocument();
});
