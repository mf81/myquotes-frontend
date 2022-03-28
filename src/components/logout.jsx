import React from "react";
//import { useNavigate } from "react-router-dom";

const Logout = () => {
  //const navigate = useNavigate();
  localStorage.removeItem("token");
  //navigate("/");
  return <h1>Szczęśliwie jesteś logaoutowany !!!</h1>;
};

export default Logout;
