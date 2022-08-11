import React from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { isMobile } from "react-device-detect";

import "../styles.css";
import "react-toastify/dist/ReactToastify.css";

import PuzzleGame from "../features/puzzleGame/PuzzleGame";
import About from "../features/about/About";
import Rules from "../features/about/Rules";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
    fontSize: isMobile ? 40 : 14,
  },
  palette: {
    primary: { main: "#FFFFFF" },
    secondary: { main: "#00000" },
  },
});
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/numbers_puzzle" element={<PuzzleGame />}></Route>
          <Route exact path="/numbers_puzzle/about" element={<About />}></Route>
          <Route exact path="/numbers_puzzle/rules" element={<Rules />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
