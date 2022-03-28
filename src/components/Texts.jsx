import React, { useContext } from "react";
import Text from "./Text";
import WindowComponent from "./windowComponent";
import AddQuote from "./addQuoteComponent";
import StateContext from "../contexts/stateContext";

function Texts() {
  const { addQuotes } = useContext(StateContext);

  return (
    <React.Fragment>
      <WindowComponent submit={addQuotes} buttonName="Add Quote">
        <AddQuote />
      </WindowComponent>
      <Text />
    </React.Fragment>
  );
}

export default Texts;
