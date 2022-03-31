import React, { useContext, useEffect } from "react";
import useState from "react-usestateref";
import WindowComponent from "../windowComponent";
import InputComponent from "../inputComponent";
import UsersContext from "../../contexts/usersContext";
import joiValidator from "./joiValidator";
import api from "../../apiService/api";
import _ from "lodash";

const EditUserComponent = ({ id }) => {
  const userModel = {
    _id: "",
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "",
  };

  const { usersApp, setUsersApp } = useContext(UsersContext);

  const [componentUser, setComponentUser, refComponentUser] =
    useState(userModel);
  const [, setErrorEditState, refErrorEditState] = useState(userModel);
  const [, setErrorBoolean, refErrorBoolean] = useState();

  useEffect(() => {
    const user = usersApp.filter((u) => u._id === id);
    setComponentUser({
      ...user[0],
      password: "",
      passwordConfirm: "",
      _id: id,
    });
  }, []);

  const changeValue = async (e) => {
    const { name, value } = e.currentTarget;
    setComponentUser({ ...componentUser, [name]: value });
  };

  useEffect(() => {
    const [errorsValue, boolean] = joiValidator(componentUser, userModel);
    setErrorBoolean(boolean);
    setErrorEditState(errorsValue);
  }, [
    componentUser.name,
    componentUser.email,
    componentUser.password,
    componentUser.passwordConfirm,
    componentUser.role,
  ]);

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    try {
      await api.put(
        "/users/",
        id,
        _.pick(componentUser, ["name", "email", "password", "role"])
      );

      const pickedComponentUser = _.pick(componentUser, [
        "_id",
        "name",
        "email",
        "role",
      ]);

      const index = usersApp.findIndex((obj) => obj._id == id);
      const copyUsersApp = usersApp;
      copyUsersApp[index] = pickedComponentUser;
      setUsersApp([...copyUsersApp]);
    } catch (error) {
      console.log("submit error", error);
    }
  };
  return (
    <WindowComponent
      submit={(e) => handleSubmitEdit(e)}
      buttonName="Edit User"
      buttonDisable={refErrorBoolean.current}
    >
      <form onSubmit={(e) => handleSubmitEdit(e)}>
        <InputComponent
          value={componentUser.name}
          onChange={(e) => changeValue(e)}
          name="name"
          label="User name:"
          id="name"
          type="text"
          error={refErrorEditState.current.name}
        />
        <InputComponent
          value={componentUser.email}
          onChange={(e) => changeValue(e)}
          name="email"
          label="User e-mail:"
          id="email"
          type="text"
          error={refErrorEditState.current.email}
        />
        <InputComponent
          value={componentUser.password}
          onChange={(e) => changeValue(e)}
          name="password"
          label="User password:"
          id="password"
          type="text"
          error={refErrorEditState.current.password}
        />
        <InputComponent
          value={componentUser.passwordConfirm}
          onChange={(e) => changeValue(e)}
          name="passwordConfirm"
          label="Type password once again:"
          id="passwordConfirm"
          type="text"
          error={refErrorEditState.current.passwordConfirm}
        />
        <InputComponent
          value={componentUser.role}
          onChange={(e) => changeValue(e)}
          name="role"
          label="User role:"
          id="role"
          type="text"
          error={refErrorEditState.current.role}
        />
      </form>
    </WindowComponent>
  );
};

export default EditUserComponent;
