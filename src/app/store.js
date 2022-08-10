import { configureStore } from "@reduxjs/toolkit";
import PuzzleGameReducer from "../features/puzzleGame/puzzleGameSlice";
import { asyncDispatchMiddleware } from "./asyncDispatchMiddleware";
import { saveDataMiddleware } from "./saveDataMiddleware";

export default configureStore({
  reducer: {
    puzzleGame: PuzzleGameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncDispatchMiddleware, saveDataMiddleware),
});
