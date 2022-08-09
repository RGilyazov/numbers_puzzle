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
    <div className="flex flex-col h-full w-fit overflow-y-auto overflow-x-hidden">
      <div className="header flex-grow-0 shrink">
        <div className="border-t-2 border-b-2 rounded w-fit mb-2">
          <Row id={topRow.id} cells={topRow.cells} />
        </div>
      </div>
      <div
        ref={glassRef}
        className="flex-grow shrink overflow-y-auto overflow-x-hidden flex flex-col"
      >
        {rowsComps}
      </div>
    </div>
  );
}
