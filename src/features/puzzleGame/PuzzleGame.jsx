import React from "react";
import Glass from "./Glass";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Layout from "../about/Layout";

export default function PuzzleGame() {
  const state = useSelector((state) => state.puzzleGame);

  useEffect(() => {
    const onUnload = (e) => {
      e.preventDefault();
      e.returnValue = "game progress will be lost";
      return e.returnValue;
    };
    window.addEventListener("beforeunload", onUnload);
    return () => {
      window.removeEventListener("beforeunload", onUnload);
    };
  });
  const { rows, topRow } = state;
  return (
    <Layout children={[<Glass key="1" rows={rows} topRow={topRow} />]}></Layout>
  );
}