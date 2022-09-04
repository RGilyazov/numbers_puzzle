import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PuzzleGame from "../../features/puzzleGame/components/PuzzleGame";
import { Provider } from "react-redux";
import store from "../../app/store";

test("renders PuzzleGame", () => {
  render(
    <Provider store={store}>
      <PuzzleGame />
    </Provider>
  );
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

test("PuzzleGame=>Cell onClick", () => {
  //click on two neighbor cells with value 1 (marked with '<').
  //expect it will show animate-shake-cell-2s animation
  // 1<, 2, 3, 4, 5, 6, 7, 8, 9,
  // 1<, 1, 1, 2, 1, 3, 1, 4, 1,
  // 5 , 1, 6, 1, 7, 1, 8, 1, 9,
  render(
    <Provider store={store}>
      <PuzzleGame />
    </Provider>
  );
  let elements = screen.queryAllByText("1");
  expect(screen.queryAllByText("1").length).toBe(11);
  fireEvent.click(elements[0]);
  fireEvent.click(elements[1]);
  elements = screen.queryAllByText("1");
  expect(elements[0].classList.contains("animate-shake-cell-2s")).toBe(true);
});
