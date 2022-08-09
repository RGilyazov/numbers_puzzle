import React from "react";
import { useDispatch } from "react-redux";

import { rewrite, newGame } from "../puzzleGame/puzzleGameSlice.js";
import MenuButton from "./MenuButton.jsx";

export default function Menu(props) {
  const dispatch = useDispatch();
  const gameButtons = [
    <MenuButton
      key="1"
      onClick={() => dispatch(rewrite())}
      caption="rewrite"
    />,
    <MenuButton
      key="2"
      onClick={() => dispatch(newGame())}
      caption="new game"
    />,
  ];
  const backToGameLink = (
    <MenuButton key="3" to="/numbers_puzzle" caption="back to the game" />
  );
  return (
    <ul className="flex-none flex flex-row items-center">
      {props.inGame ? gameButtons : backToGameLink}
      <MenuButton to="/numbers_puzzle/rules" caption="rules" />
      <MenuButton to="/numbers_puzzle/about" caption="about" />
    </ul>
  );
}
