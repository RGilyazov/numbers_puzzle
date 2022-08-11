import React from "react";
import Row from "./Row";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { changeScroll } from "./puzzleGameSlice.js";

export default function Glass(props) {
  const topRow = props.topRow;
  const rows = props.rows;
  const glassRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const onScroll = () => {
      const payload = {
        scrollTop: glassRef.current.scrollTop,
        scrolltHeight: glassRef.current.scrollHeight,
      };
      dispatch(changeScroll(payload));
    };
    glassRef.current.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  const rowsComps = rows.map((row, index) => (
    <Row key={row.id} id={row.id} cells={row.cells} />
  ));

  return (
    <div className="flex flex-col flex-grow overflow-y overflow-x-hidden shadow-lg border-gray-300 border m-4">
      <div className="border-b-2 rounded w-fit mb-2">
        <Row id={topRow.id} cells={topRow.cells} />
      </div>
      <div
        ref={glassRef}
        className="flex-grow shrink overflow-y-scroll overflow-x-hidden flex flex-col w-fit"
      >
        {rowsComps}
      </div>
    </div>
  );
}
