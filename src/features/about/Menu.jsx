import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  rewrite,
  newGame,
  saveGame,
  loadGame,
  selectStateToSave,
} from "../puzzleGame/puzzleGameSlice.js";
import MenuButton from "./MenuButton.jsx";

export default function Menu(props) {
  const state = useSelector(selectStateToSave);
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
    <MenuButton
      key="3"
      onClick={() => dispatch(saveGame(state))}
      caption="save game"
    />,
    <MenuButton
      key="4"
      onClick={() => dispatch(loadGame())}
      caption="load game"
    />,
  ];
  const backToGameLink = (
    <MenuButton key="101" to="/numbers_puzzle" caption="back to the game" />
  );
  return (
    <div>
     <ul className="flex-none flex flex-row items-center">
        {props.inGame ? gameButtons : backToGameLink}
        <MenuButton to="/numbers_puzzle/rules" caption="rules" />
        <MenuButton to="/numbers_puzzle/about" caption="about" />
      </ul>
    </div>
  );
}
