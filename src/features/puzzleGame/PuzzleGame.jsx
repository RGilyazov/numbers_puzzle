import React from "react";
import Glass from "./Glass";
import { useSelector } from "react-redux";
import Menu from "../about/Menu";
import Layout from "../about/Layout";

export default function PuzzleGame() {
  const state = useSelector((state) => state.puzzleGame);
  const { rows, topRow } = state;
  return (
    <Layout
      children={[
        <Menu key="1" inGame={true} />,
        <Glass key="2" rows={rows} topRow={topRow} />,
      ]}
    ></Layout>
  );

}
