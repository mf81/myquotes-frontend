import React, { useEffect, useContext } from "react";
import useState from "react-usestateref";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import StateContext from "../../contexts/stateContext";
import api from "../../apiService/api";
import WindowComponent from "../windowComponent";
import InputComponent from "../inputComponent";
import joiValidator from "./joiValidator";

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
    console.log("reander");
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
          <WindowComponent
            submit={(e) => handleSubmit(e)}
            buttonName="Add User"
            buttonDisable={refErrorBoolean.current}
          >
            <form onSubmit={(e) => handleSubmit(e)}>
              <InputComponent
                value={newUser.name}
                onChange={(e) => changeValue(e)}
                name="name"
                label="User name:"
                id="name"
                type="text"
                error={refErrorState.current.name}
              />
              <InputComponent
                value={newUser.email}
                onChange={(e) => changeValue(e)}
                name="email"
                label="User e-mail:"
                id="email"
                type="text"
                error={refErrorState.current.email}
              />
              <InputComponent
                value={newUser.password}
                onChange={(e) => changeValue(e)}
                name="password"
                label="User password:"
                id="password"
                type="text"
                error={refErrorState.current.password}
              />
              <InputComponent
                value={newUser.passwordConfirm}
                onChange={(e) => changeValue(e)}
                name="passwordConfirm"
                label="Type password once again:"
                id="passwordConfirm"
                type="text"
                error={refErrorState.current.passwordConfirm}
              />
              <InputComponent
                value={newUser.role}
                onChange={(e) => changeValue(e)}
                name="role"
                label="User role:"
                id="role"
                type="text"
                error={refErrorState.current.role}
              />
            </form>
          </WindowComponent>

          <Container>
            <Row>
              <Col>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name:</th>
                      <th>e-mail:</th>
                      <th>role:</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersApp.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <Button variant="primary">Edit</Button>
                        </td>
                        <td>
                          <Button variant="danger">Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default AdminComponent;
