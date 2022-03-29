import React from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
const TableUsersComponent = (props) => {
  const { usersApp } = props;
  return (
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
  );
};

export default TableUsersComponent;
