import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import StateContext from "../contexts/stateContext";

const NavBar = () => {
  const { token } = useContext(StateContext);
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">My QUOTES</Navbar.Brand>
        <Nav className="me-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
          {!token && (
            <Link to="/login" className="nav-link">
              LogIN
            </Link>
          )}
          {token && (
            <Link to="/logout" className="nav-link">
              LogOUT
            </Link>
          )}
          {token && token.role === "admin" && (
            <Link to="/admin" className="nav-link">
              Administration
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
