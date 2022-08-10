import React from "react";
import { ToastContainer } from "react-toastify";
export default function Layout(props) {
  return (
    <div className="flex  h-full justify-center">
      <ToastContainer hideProgressBar={true} autoClose={1000} />
      <div className="flex-col h-full flex shrink">{props.children}</div>
    </div>
  );
}
