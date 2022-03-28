import React, { useContext, useEffect } from "react";
import InputComponent from "./inputComponent";
import StateContext from "../contexts/stateContext";

const EditQuoteComponent = (props) => {
  const {
    texts,
    handleEditSubmit,
    handleEditChange,
    quoteValue,
    setQuoteValue,
  } = useContext(StateContext);

  useEffect(() => {
    const y = [...texts];
    const t = y.filter((t) => t._id === props.textItem._id);
    setQuoteValue({ text: t[0].text });
  }, []);

  return (
    <>
      <form>
        {/* onSubmit={(e) => handleEditSubmit(e, props.textItem._id)}> */}
        <InputComponent
          value={quoteValue.text}
          onChange={handleEditChange}
          name="text"
          id="text"
          type="text"
          //   error={error.email}
        />
      </form>
    </>
  );
};

export default EditQuoteComponent;
