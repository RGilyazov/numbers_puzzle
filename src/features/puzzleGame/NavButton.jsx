import React from "react";
import { isMobile } from "react-device-detect";

export default function NavButton(props) {
  const textSize = isMobile ? "text-4xl" : "text-lg";
  const buttonClassName = `hover:underline text-blue-900 font-bold py-2 px-4 rounded ${textSize}`;

  return (
    <button onClick={props.onClick} className={buttonClassName} type="button">
      {" "}
      {props.caption}
    </button>
  );
}
