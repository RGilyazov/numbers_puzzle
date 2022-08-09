import React from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

export default function MenuButton(props) {
  const textSize = isMobile ? "text-4xl" : "text-lg";
  const ClassName = `touch-manipulation hover:underline text-blue-900 font-bold py-2 px-4 ${textSize}`;
  const link = (
    <Link className={ClassName} to={props.to}>
      {props.caption}
    </Link>
  );
  const button = (
    <button className={ClassName} onClick={props.onClick} type="button">
      {props.caption}
    </button>
  );
  return props.to ? link : button;
}
