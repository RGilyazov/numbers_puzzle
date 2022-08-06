import React, { useEffect } from "react";
import "../styles.css";

import { useDispatch, useSelector } from "react-redux";
import PuzzleGame from "../features/puzzleGame/PuzzleGame";

function App() {
  // const dispatch = useDispatch();
  // const { isLoading, hasError } = useSelector((state) => state.allRecipes);

  // useEffect(() => {
  //   dispatch(loadRecipes());
  // }, [dispatch]);

  // const onTryAgainHandler = () => {
  //   dispatch(loadRecipes());
  // };

  return (
    <main>
      <PuzzleGame></PuzzleGame>
    </main>
  );
}

export default App;
