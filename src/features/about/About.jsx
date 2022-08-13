import React from "react";

export default function About() {
  return (
    <div className="m-4 p-4">
      <p>
        Packages used for this project:
        <ul className="list-disc m-4">
          <li>
            <a
              className="no-underline hover:underline"
              href="http://reactjs.org/"
            >
              <b>react</b>
            </a>{" "}
            as main library for interface building
          </li>
          <li>
            <a
              className="no-underline hover:underline"
              href="http://redux.js.org/"
            >
              <b>redux</b>
            </a>
            +{" "}
            <a
              className="no-underline hover:underline"
              href="http://react-redux.js.org/"
            >
              <b>react-redux</b>
            </a>{" "}
            +
            <a
              className="no-underline hover:underline"
              href="http://redux-toolkit.js.org/"
            >
              <b>redux-toolkit</b>
            </a>{" "}
            for application state control
          </li>
          <li>
            <a
              className="no-underline hover:underline"
              href="https://reactrouter.com/"
            >
              {" "}
              <b> react-router</b>
            </a>{" "}
            for routing
          </li>
          <li>
            <a
              className="no-underline hover:underline"
              href="https://www.npmjs.com/package/react-toastify"
            >
              <b>react-toastify</b>
            </a>{" "}
            to inform user about long or async actions
          </li>
          <li>
            <a
              className="no-underline hover:underline"
              href="https://tailwindcss.com/"
            >
              <b>tailwind css</b>{" "}
            </a>
            for styling
          </li>
          <li>
            <a className="no-underline hover:underline" href="https://mui.com/">
              <b>mui</b>
            </a>{" "}
            for application navbar
          </li>
        </ul>
      </p>

      <p>
        Developed by Gilyazov Ruslan. You can find source code{" "}
        <a
          className="no-underline hover:underline"
          href="https://github.com/bbOracul/numbers_puzzle"
        >
          <b>here</b>
        </a>
        .{" "}
      </p>
      <p>
        {" "}
        Contact me via{" "}
        <a
          className="no-underline hover:underline"
          href="https://www.linkedin.com/in/ruslangilyazov/"
        >
          <b>linked-in</b>
        </a>
        .
      </p>
    </div>
  );
}
