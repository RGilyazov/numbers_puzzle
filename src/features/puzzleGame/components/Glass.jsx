import Row from "./Row";
import { useEffect, useRef } from "react";

export default function Glass(props) {
  const topRow = props.topRow;
  const rows = props.rows;
  const onChangeScroll = props.eventHandlers.onChangeScroll;
  const glassRef = useRef();

  useEffect(() => {
    const onScroll = () => {
      const payload = {
        scrollTop: glassRef.current.scrollTop,
        scrollHeight: glassRef.current.scrollHeight,
        clientHeight: glassRef.current.clientHeight,
      };
      onChangeScroll(payload);
    };
    glassRef.current.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  const rowsComps = rows.map((row, index) => (
    <Row
      key={row.id}
      id={row.id}
      cells={row.cells}
      eventHandlers={props.eventHandlers}
      activeCell={props.activeCell}
      lastCell={props.lastCell}
    />
  ));

  return (
    <div className="flex flex-col flex-grow overflow-y overflow-x-hidden shadow-lg border-gray-300 border m-2">
      <div className="border-b-2 rounded w-fit mb-2">
        <Row
          id={topRow.id}
          cells={topRow.cells}
          eventHandlers={props.eventHandlers}
          activeCell={props.activeCell}
          lastCell={props.lastCell}
        />
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
