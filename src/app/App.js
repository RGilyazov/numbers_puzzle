import React, { useEffect } from "react";
import "../styles.css";

import { useDispatch, useSelector } from "react-redux";
import Cell from "../components/Cell";
import Row from "../components/Row";
import Glass from "../components/Glass";

function App() {
  // const dispatch = useDispatch();
  // const { isLoading, hasError } = useSelector((state) => state.allRecipes);

  // useEffect(() => {
  //   dispatch(loadRecipes());
  // }, [dispatch]);

  // const onTryAgainHandler = () => {
  //   dispatch(loadRecipes());
  // };
  const rows = [];
  for (let i = 0; i < 40; i++) {
    let cells = [1, 2, 3, 4, 5, 6, 7].map((number, index) => ({
      value: number,
      color: "#42c2f5",
    }));
    rows.push(cells);
  }
  return (
    <main>
      <h1 className="text-3xl font-bold underline">To do...</h1>
      <Glass rows={rows} displayStart={3} displayCount={10} />
    </main>
  );
}

export default App;
