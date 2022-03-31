import React, { useState, useEffect } from "react";
import tokenDecode from "jwt-decode";
import api from "../apiService/api";
import StateContext from "../contexts/stateContext";
import Texts from "./Texts";
import Login from "./loginForm";
import Logout from "./logout";
import auth from "../services/authService";
import NavBar from "./navBarComponent";
import _ from "lodash";

import { Route, Routes, useLocation } from "react-router-dom";

import LoginBar from "./loginBarComponent";
import AdminComponent from "./admin/adminComponent";

const Main = () => {
  const [texts, setTexts] = useState([]);
  const [error, setError] = useState({});
  const [token, setToken] = useState();
  const [quoteValue, setQuoteValue] = useState({ text: "" });

  const location = useLocation();

  const getTexts = async () => {
    try {
      const { data } = await api.get("/texts");
      setTexts(data);
    } catch (error) {
      setError("Could not get Texts!");
    }
  };

  useEffect(() => {
    getTexts();
  }, []);

  useEffect(() => {
    try {
      const token = tokenDecode(auth.getToken());
      setToken(token);
    } catch (er) {
      setToken();
    }
  }, [location]);

  const addQuotes = async (e) => {
    e.preventDefault();
    const oldValue = [...texts];
    try {
      const result = await api.post("/texts", { text: quoteValue.text });
      setTexts([...oldValue, result.data]);
      setQuoteValue({ text: "" });
    } catch {
      setTexts(oldValue);
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.currentTarget;
    setQuoteValue((quoteValue) => {
      const newQuote = { ...quoteValue };
      newQuote[name] = value;
      return newQuote;
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.currentTarget;
    setQuoteValue((quoteValue) => {
      const newQuote = { ...quoteValue };
      newQuote[name] = value;
      return newQuote;
    });
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await api.put("/texts/", id, _.pick(quoteValue, ["text"]));
      const pickedQuoteValue = _.pick(quoteValue, ["text"]);
      const index = texts.findIndex((obj) => obj._id === id);
      const copyTexts = texts;
      copyTexts[index] = pickedQuoteValue;
      setTexts([...copyTexts]);
    } catch (error) {
      console.log("submit error", error);
    }
  };

  const deleteQuote = async (id) => {
    const oldValue = [...texts];
    const newValue = oldValue.filter((t) => t._id !== id);
    setTexts(newValue);
    try {
      await api.delete("/texts/" + id);
    } catch (error) {
      setTexts(oldValue);
    }
  };

  return (
    <div className="container">
      <StateContext.Provider
        value={{
          texts,
          error,
          token,
          quoteValue,
          addQuotes,
          setQuoteValue,
          deleteQuote,
          handleAddChange,
          handleEditChange,
          handleEditSubmit,
        }}
      >
        <NavBar />
        <LoginBar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Texts />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin" element={<AdminComponent />} />
        </Routes>
      </StateContext.Provider>
    </div>
  );
};

export default Main;
