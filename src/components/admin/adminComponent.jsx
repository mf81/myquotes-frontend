import React, { useEffect, useContext } from "react";
import useState from "react-usestateref";
import StateContext from "../../contexts/stateContext";
import api from "../../apiService/api";
import joiValidator from "./joiValidator";
import AddUserComponent from "./addUserComponent";
import TableUsersComponent from "./tableUsersComponent";
import UsersContext from "../../contexts/usersContext";

const AdminComponent = () => {
  const userModel = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "",
  };
  const [usersApp, setUsersApp, refUsersApp] = useState([]);
  const [newUser, setNewUser] = useState(userModel);
  const [, setErrorState, refErrorState] = useState(userModel);
  const [, setErrorBoolean, refErrorBoolean] = useState();
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

  const handleSubmitAdd = async (e) => {
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

  const deleteUser = async (id) => {
    const oldValue = [...usersApp];
    const newValue = oldValue.filter((u) => u._id !== id);
    setUsersApp(newValue);
    try {
      await api.delete("/users/" + id);
    } catch (error) {
      setUsersApp(oldValue);
    }
  };

  return (
    <>
      {token && token.role === "admin" && (
        <>
          <UsersContext.Provider
            value={{
              usersApp,
              refUsersApp,
              setUsersApp,
              newUser,
              setNewUser,
              handleSubmitAdd,
              deleteUser,
              changeValue,
              refErrorState: refErrorState.current,
              refErrorBoolean: refErrorBoolean.current,
            }}
          >
            <AddUserComponent />
            <TableUsersComponent
              usersApp={usersApp}
              newUser={newUser}
              handleSubmit={null}
              changeValue={changeValue}
              refErrorState={refErrorState.current}
              refErrorBoolean={refErrorBoolean.current}
            />
          </UsersContext.Provider>
        </>
      )}
    </>
  );
};

export default AdminComponent;
