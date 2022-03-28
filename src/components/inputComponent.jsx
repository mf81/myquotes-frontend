import React from "react";

const Input = ({ type, name, label, value, onChange, placeholder, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={value}>{label}</label>
      <input
        className="form-control"
        placeholder={placeholder}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger m-2">{error}</div>}
    </div>
  );
};

export default Input;
