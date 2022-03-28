import React, { useState, useContext } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import StateContext from "../contexts/stateContext";

const WindowComponent = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { token } = useContext(StateContext);

  return (
    <Container fluid="md">
      {token && (
        <Button variant="primary" onClick={handleShow}>
          {props.buttonName}
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.buttonName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {props.submit && !props.buttonDisable && (
            <Button
              variant="primary"
              onClick={(e) => {
                props.submit(e);
                handleClose();
              }}
            >
              Add Quote
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default WindowComponent;
