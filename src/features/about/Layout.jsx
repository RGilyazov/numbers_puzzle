import React from "react";
import { ToastContainer } from "react-toastify";
export default function Layout(props) {
  return (
    <div className="flex  h-full justify-center">
      <ToastContainer hideProgressBar={true} autoClose={1000} />
      <div className="flex-col flex shrink items-centers h-full">
        {props.children}
      </div>
    </div>
  );
}
