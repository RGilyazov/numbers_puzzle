import React from "react";
import Menu from "./Menu";
import Layout from "./Layout";

export default function About() {
  return (
    <Layout
      children={[
        <div>
          <Menu inGame={false} />
          {"this is about page"}
        </div>,
      ]}
    ></Layout>
  );
}
