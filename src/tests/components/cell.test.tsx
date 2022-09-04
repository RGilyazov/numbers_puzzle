import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Cell from "../../features/puzzleGame/components/Cell";
import { _puzzleGameUtilsExportedForTesting } from "../../features/puzzleGame/puzzleGameUtils";

test("renders Cell", () => {
  const CellData = _puzzleGameUtilsExportedForTesting.getNewCell(8, 0, 0);
  render(
    <Cell cell={{ ...CellData, last: false, activate: false, active: false }} />
  );
  const element = screen.getByText("8");

  expect(element).toBeInTheDocument();
});

test("Cell onClick", () => {
  const handleClick = jest.fn();
  const CellData = _puzzleGameUtilsExportedForTesting.getNewCell(8, 0, 0);
  render(
    <Cell
      cell={{ ...CellData, last: false, activate: false, active: false }}
      onClick={handleClick}
    />
  );
  const element = screen.getByText("8");
  fireEvent.click(element);
  expect(handleClick).toBeCalledTimes(1);
});

test("Cell onActivate", () => {
  const scrollIntoViewMock = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  const handleActivate = jest.fn();
  const CellData = _puzzleGameUtilsExportedForTesting.getNewCell(8, 0, 0);
  render(
    <Cell
      cell={{ ...CellData, last: false, activate: true, active: true }}
      onActivate={handleActivate}
    />
  );
  expect(handleActivate).toBeCalledTimes(1);
  expect(scrollIntoViewMock).toBeCalledTimes(1);
});
