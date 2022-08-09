import React from "react";
import { useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";

import { rewrite, newGame } from "./puzzleGameSlice.js";
import NavButton from "./NavButton.jsx";

export default function NavBar(props) {
  const dispatch = useDispatch();
  return (
    <ul className="flex flex-row">
      <li>
        <NavButton onClick={() => dispatch(rewrite())} caption="rewrite" />
      </li>
      <li>
        <NavButton onClick={() => dispatch(newGame())} caption="new game" />
      </li>
      <li>
        <NavButton onClick={() => dispatch(newGame())} caption="rules" />
      </li>
      <li>
        <NavButton onClick={() => dispatch(newGame())} caption="about" />
      </li>
    </ul>
  );
}
