import React from "react";
import { useNavigate } from "react-router-dom";
import useState from "react-usestateref";
import InputComponent from "./inputComponent";
import { token } from "../services/authService";

const LoginForm = () => {
  const [account, setAccount] = useState({ email: "", password: "" });
  const [error, setError, errorRef] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const validateEmpty = (state, message) => {
    Object.entries(error).map((name) => {
      return setError((oldErrors) => {
        const newErrors = { ...oldErrors };
        !state[name[0]]
          ? (newErrors[name[0]] = message)
          : (newErrors[name[0]] = false);
        return newErrors;
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateEmpty(account, "Pole nie może być puste");
    if (!errorRef.current.email && !errorRef.current.password) {
      try {
        const { data } = await token(account);
        localStorage.setItem("token", data);
        navigate("/");
      } catch (error) {
        setError({ password: "Błedny login lub hasło" });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setAccount((oldAccount) => {
      const newAccount = { ...oldAccount };
      newAccount[name] = value;
      return newAccount;
    });
  };
  return (
    <div className="container">
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <InputComponent
          value={account.email}
          onChange={handleChange}
          name="email"
          id="email"
          type="text"
          placeholder="e-mail"
          error={error.email}
        />
        <InputComponent
          value={account.password}
          onChange={handleChange}
          name="password"
          id="password"
          type="text"
          placeholder="password"
          error={error.password}
        />
        <button type="submit" className="btn btn-primary m-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
