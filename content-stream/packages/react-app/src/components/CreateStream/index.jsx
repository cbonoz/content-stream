import React from "react";
import PropTypes from "prop-types";
import { EXAMPLE_CARDS } from "./util";
import StreamCard from "../StreamCard";

function CreateStream(props) {
  return (
    <div>
      {EXAMPLE_CARDS.map((x, i) => {
        return <StreamCard key={i} data={x} />;
      })}
    </div>
  );
}

export default CreateStream;
