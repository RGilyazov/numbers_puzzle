import React from "react";
import { useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";

import { rewrite, newGame } from "./puzzleGameSlice.js";
import MenuButton from "./MenuButton.jsx";

export default function Menu(props) {
  const dispatch = useDispatch();
  return (
    <ul className="flex-none flex flex-row">
      <li>
        <MenuButton onClick={() => dispatch(rewrite())} caption="rewrite" />
      </li>
      <li>
        <MenuButton onClick={() => dispatch(newGame())} caption="new game" />
      </li>
      <li>
        <MenuButton onClick={() => dispatch(newGame())} caption="rules" />
      </li>
      <li>
        <MenuButton onClick={() => dispatch(newGame())} caption="about" />
      </li>
    </ul>
  );
}
