import { configureStore } from "@reduxjs/toolkit";
import PuzzleGameReducer from "../features/puzzleGame/puzzleGameSlice";
import { asyncDispatchMiddleware } from "./middleware/asyncDispatchMiddleware";
import { saveDataMiddleware } from "./middleware/saveDataMiddleware";

export default configureStore({
  reducer: {
    puzzleGame: PuzzleGameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncDispatchMiddleware, saveDataMiddleware),
});
