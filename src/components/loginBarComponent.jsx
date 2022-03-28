import React, { useContext } from "react";
import StateContext from "../contexts/stateContext";
const LoginBar = () => {
  const { token } = useContext(StateContext);
  return (
    <>
      {token && (
        <p>
          Login user {token.name}: {token.email} at role: {token.role}
        </p>
      )}
    </>
  );
};

export default LoginBar;
