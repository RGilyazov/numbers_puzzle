import React from "react";
import Layout from "./Layout";

export default function About() {
  return (
    <Layout children={[<div key="1">{"this is about page"}</div>]}></Layout>
  );
}
