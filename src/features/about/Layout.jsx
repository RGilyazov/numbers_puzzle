import React from "react";
export default function Layout(props) {
  return (
    <div className="flex  h-full justify-center">
      <div className="flex-col h-full flex shrink">{props.children}</div>
    </div>
  );
}
