import React, { useState, useEffect, useContext } from "react";
import AddUserComponent from "./addUserComponent";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import EditUserComponent from "./editUserComponent";
import UsersContext from "../../contexts/usersContext";

const TableUsersComponent = () => {
  const { usersApp, refUsersApp } = useContext(UsersContext);
  console.log("usersApp z table", usersApp);
  return (
    <>
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
                      <EditUserComponent id={user._id} />
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
  );
};

export default TableUsersComponent;
