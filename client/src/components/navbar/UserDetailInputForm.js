import React from "react";
import { Modal, Form, Col, Button } from "react-bootstrap";

const UserDetailInputForm = ({
  showUserDetailInputModal,
  hideUserDetailModal,
}) => {
  return (
    <Modal show={showUserDetailInputModal} onHide={hideUserDetailModal}>
      <Modal.Header closeButton>
        <Modal.Title>Your Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>
              <strong>Full name</strong>{" "}
              <span
                style={{
                  fontSize: "0.8em",
                  color: "grey",
                }}
              >
                (As written on your ID Card)
              </span>
            </Form.Label>
            <Form.Control type="text" placeholder="Enter your name here..." />
          </Form.Group>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>
                  <strong>Gender</strong>
                </Form.Label>
                <Form.Control as="select">
                  <option>Male</option>
                  <option>Femail</option>
                  <option>Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>
                  <strong>Blood type</strong>
                </Form.Label>
                <Form.Control as="select">
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Group>
            <Form.Label>
              <strong>Profile image</strong>
            </Form.Label>
            <Form.File />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <strong>ID/Passport number:</strong>
            </Form.Label>
            <Form.Control type="text" placeholder="ID/Passport number..." />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <strong>Job</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Student, Engineer,..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={hideUserDetailModal}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailInputForm;
