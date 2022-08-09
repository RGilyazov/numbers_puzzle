import React from "react";
import Row from "./Row";
import NavBar from "./NavBar";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { changeScroll } from "./puzzleGameSlice.js";

export default function Glass(props) {
  const topRow = props.topRow;
  const rows = props.rows;
  const glassRef = useRef();
  const captionRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const onScroll = () => {
      const payload = {
        scrollTop: glassRef.current.scrollTop,
        scrolltHeight:
          glassRef.current.scrollHeight - captionRef.current.scrollHeight,
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
    <div
      ref={glassRef}
      className="overflow-y-auto overflow-x-hidden flex flex-col w-fit h-screen max-h-screen"
    >
      <div ref={captionRef} className="sticky top-0 bg-white z-50">
        <NavBar />
        <div className="border-t-2 border-b-2 rounded w-fit mb-2">
          <Row id={topRow.id} cells={topRow.cells} />
        </div>
      </div>
      <div className="flex-col border-black">{rowsComps}</div>
    </div>
  );
}
