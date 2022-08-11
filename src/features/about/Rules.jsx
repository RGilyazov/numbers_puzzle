import React from "react";
import Menu from "./Menu";
import Layout from "./Layout";

export default function Rules() {
  return (
    <Layout children={[<div key="1">{"this is rules page"}</div>]}></Layout>
  );
}
