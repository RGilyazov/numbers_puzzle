import Cell from "./Cell";
import { CellVisual } from "./Cell";
import { CellData } from "../puzzleGameUtils";

export type RowProps = {
  id: number;
  cells: CellData[];
  activeCell?: CellData & { activate?: boolean };
  lastCell?: CellData;
  eventHandlers?: {
    onCellClick?: (Cell: CellVisual) => void;
    onCellActivate?: (Cell: CellVisual) => void;
  };
};

export default function Row(props: RowProps) {
  const activeCell = props.activeCell;
  const lastCell = props.lastCell;
  const cells = props.cells.map((cell, index) => {
    let cellData: CellVisual = {
      ...cell,
      active: activeCell?.index === index && activeCell?.rowId === cell.rowId,
      last: lastCell?.index === index && lastCell?.rowId === cell.rowId,
      activate: false,
    };
    cellData.index = index;
    if (cellData?.rowId === undefined) cellData.rowId = props.id;
    cellData.activate =
      (activeCell?.activate === true) === true && cellData?.active === true;
    return (
      <Cell
        key={index}
        cell={cellData}
        onClick={props.eventHandlers?.onCellClick}
        onActivate={props.eventHandlers?.onCellActivate}
      />
    );
  });
  return <div className="flex"> {cells} </div>;
}
