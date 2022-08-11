import React from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
export default function Layout(props) {
  return (
    <div className="flex  h-full justify-center">
      <div className="flex-col flex shrink items-center h-full">
        <ToastContainer hideProgressBar={true} autoClose={1000} />
        <Navbar />
        {props.children}
      </div>
    </div>
  );
}
