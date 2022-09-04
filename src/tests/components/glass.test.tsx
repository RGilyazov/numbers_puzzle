import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Glass from "../../features/puzzleGame/components/Glass";
import { getInitialRows } from "../../features/puzzleGame/puzzleGameUtils";

function getTestRows() {
  return getInitialRows();
}

test("renders Glass", () => {
  // initial numbers should be
  // 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 1, 9,
  const rows = getTestRows();
  render(<Glass rows={rows} />);
  const elements1 = screen.queryAllByText("1");
  expect(elements1[0]).toBeInTheDocument();
  expect(elements1.length).toBe(11);
  const elements2 = screen.queryAllByText("2");
  expect(elements2[0]).toBeInTheDocument();
  expect(elements2.length).toBe(2);
  const elements3 = screen.queryAllByText("3");
  expect(elements3[0]).toBeInTheDocument();
  expect(elements3.length).toBe(2);
});

test("Glass=>Cell onClick", () => {
  const handleClick = jest.fn();
  const rows = getTestRows();
  render(<Glass rows={rows} eventHandlers={{ onCellClick: handleClick }} />);
  const element = screen.queryAllByText("1");
  fireEvent.click(element[0]);
  expect(handleClick).toBeCalledTimes(1);
});

test("simulate scroll", () => {
  const handleScroll = jest.fn();
  const rows = getTestRows();
  render(
    <Glass
      rows={rows}
      eventHandlers={{ onChangeScroll: handleScroll }}
      dataTestId={"testID"}
    />
  );
  const element = screen.getByTestId("testID");
  expect(element).toBeInTheDocument();
  fireEvent.scroll(element, { target: { scrollY: 101 } });

  expect(handleScroll).toBeCalledTimes(1);
});
