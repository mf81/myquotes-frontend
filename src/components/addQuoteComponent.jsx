import React, { useContext } from "react";
import InputComponent from "./inputComponent";
import StateContext from "../contexts/stateContext";

const AddQuote = () => {
  const { addQuotes, handleAddChange, quoteValue } = useContext(StateContext);

  return (
    <form onSubmit={addQuotes}>
      <InputComponent
        value={quoteValue.text}
        onChange={handleAddChange}
        name="text"
        id="text"
        type="text"
        placeholder="Wpisz co Ci po głowie chodzi ..."
        //   error={error.email}
      />
    </form>
  );
};

export default AddQuote;
