import { configureStore } from "@reduxjs/toolkit";
import PuzzleGameReducer from "../features/puzzleGame/puzzleGameSlice";
import { asyncDispatchMiddleware } from "./asyncDispatchMiddleware";

export default configureStore({
  reducer: {
    puzzleGame: PuzzleGameReducer,
    //  favoriteRecipes: favoriteRecipesReducer,
    //  search: searchReducer,
  },
  //middleware: [asyncDispatchMiddleware, ...getDefaultMiddleware()],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncDispatchMiddleware),
});
