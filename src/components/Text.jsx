import React, { useContext } from "react";
import StateContext from "../contexts/stateContext";
import EditQuote from "./editQuoteComponent";
import WindowComponent from "./windowComponent";

const Text = () => {
  const { texts, deleteQuote, token, handleEditSubmit } =
    useContext(StateContext);

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Quotes</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {texts.map((textItem) => (
            <tr key={textItem._id}>
              <td>{textItem.text}</td>
              <td>
                <WindowComponent
                  submit={(e) => handleEditSubmit(e, textItem._id)}
                  buttonName="Edit"
                >
                  <EditQuote textItem={textItem} />
                </WindowComponent>
              </td>
              <td>
                {token && (
                  <WindowComponent submit={null} buttonName="Delete">
                    <button
                      onClick={() => deleteQuote(textItem._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Yes, I wonna delete
                    </button>
                  </WindowComponent>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Text;
