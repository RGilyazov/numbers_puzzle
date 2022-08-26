import React from "react";
import { isMobile } from "react-device-detect";

export default function Rules() {
  return (
    <div
      className="m-4 p-4 text-justify"
      style={{ "max-width": isMobile ? "100%" : "30rem" }}
    >
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;The goal of the game is to remove all blocks
        from the field.{" "}
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;Only neighboring blocks with equal values or
        with values which sum is equal to 10 can be removed. Blocks in the same
        row or in the same column considered neighboring if there are no other
        blocks between them. Blocks that are located one by one from left to
        right and from top to bottom also considered neighboring (see fig.1).
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;When there are no blocks to remove all remaining
        blocks are rewrited one by one to the end of the field.
      </p>
      <figure className="flex flex-col items-center w-full">
        <p>
          <img src="images/RulsesImage.png" alt="" />
        </p>
        <figcaption className="text-center text-lg">
          fig.1 neighboring blocks
        </figcaption>
      </figure>
    </div>
  );
}
