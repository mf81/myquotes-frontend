import React, { useEffect, useContext } from "react";
import useState from "react-usestateref";
import StateContext from "../../contexts/stateContext";
import api from "../../apiService/api";
import joiValidator from "./joiValidator";
import AddUserComponent from "./addUserComponent";
import TableUsersComponent from "./tableUsersComponent";

const AdminComponent = () => {
  const userModel = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "",
  };

  const [usersApp, setUsersApp] = useState([]);
  const [newUser, setNewUser] = useState(userModel);
  const [errorState, setErrorState, refErrorState] = useState(userModel);
  const [errorBoolean, setErrorBoolean, refErrorBoolean] = useState();
  const { token } = useContext(StateContext);

  const getUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsersApp(() => data);
    } catch (er) {}
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const [errorsValue, boolean] = joiValidator(newUser, userModel);
    setErrorBoolean(boolean);
    setErrorState(errorsValue);
  }, [newUser]);

  const changeValue = async (e) => {
    const { name, value } = e.currentTarget;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!refErrorBoolean.current) {
      const oldValue = [...usersApp];
      try {
        const result = await api.post("/users", newUser);
        setUsersApp([...oldValue, result.data]);
        //setQuoteValue({ text: "" });
      } catch {
        setUsersApp(oldValue);
      }
    } else setNewUser(userModel);
  };

  return (
    <>
      {token && token.role === "admin" && (
        <>
          <AddUserComponent
            newUser={newUser}
            handleSubmit={handleSubmit}
            changeValue={changeValue}
            refErrorState={refErrorState.current}
            refErrorBoolean={refErrorBoolean.current}
          />
          <TableUsersComponent usersApp={usersApp} />
        </>
      )}
    </>
  );
};

export default AdminComponent;
