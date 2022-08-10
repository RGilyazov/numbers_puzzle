import React from "react";
import "../styles.css";
import "react-toastify/dist/ReactToastify.css";
import PuzzleGame from "../features/puzzleGame/PuzzleGame";
import About from "../features/about/About";
import Rules from "../features/about/Rules";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/numbers_puzzle" element={<PuzzleGame />}></Route>
        <Route exact path="/numbers_puzzle/about" element={<About />}></Route>
        <Route exact path="/numbers_puzzle/rules" element={<Rules />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
