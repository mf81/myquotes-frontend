import React, { useState, useEffect } from "react";
import WindowComponent from "../windowComponent";
import InputComponent from "../inputComponent";

const AddUserComponent = (props) => {
  const { handleSubmit, changeValue, newUser, refErrorState, refErrorBoolean } =
    props;
  return (
    <WindowComponent
      submit={(e) => handleSubmit(e)}
      buttonName="Add User"
      buttonDisable={refErrorBoolean}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <InputComponent
          value={newUser.name}
          onChange={(e) => changeValue(e)}
          name="name"
          label="User name:"
          id="name"
          type="text"
          error={refErrorState.name}
        />
        <InputComponent
          value={newUser.email}
          onChange={(e) => changeValue(e)}
          name="email"
          label="User e-mail:"
          id="email"
          type="text"
          error={refErrorState.email}
        />
        <InputComponent
          value={newUser.password}
          onChange={(e) => changeValue(e)}
          name="password"
          label="User password:"
          id="password"
          type="text"
          error={refErrorState.password}
        />
        <InputComponent
          value={newUser.passwordConfirm}
          onChange={(e) => changeValue(e)}
          name="passwordConfirm"
          label="Type password once again:"
          id="passwordConfirm"
          type="text"
          error={refErrorState.passwordConfirm}
        />
        <InputComponent
          value={newUser.role}
          onChange={(e) => changeValue(e)}
          name="role"
          label="User role:"
          id="role"
          type="text"
          error={refErrorState.role}
        />
      </form>
    </WindowComponent>
  );
};

export default AddUserComponent;
