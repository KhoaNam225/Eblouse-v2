import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../../style/AdminPage.css";

const SHOW_BOOKING = 1;
const SHOW_MESSAGE = 2;
const SHOW_DASHBOARD = 3;

const BookingContent = () => {
  const APPROVED_BOOKING = 1;
  const PENDING_BOOKING = 2;

  const [showMode, setShowMode] = useState(APPROVED_BOOKING);

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <div
            className={
              showMode === APPROVED_BOOKING
                ? "booking-menu-item selected-booking-mode"
                : "booking-menu-item"
            }
            onClick={() => setShowMode(APPROVED_BOOKING)}
          >
            <p>Approved appointment</p>
          </div>
          <div
            className={
              showMode === PENDING_BOOKING
                ? "booking-menu-item selected-booking-mode"
                : "booking-menu-item"
            }
            onClick={() => setShowMode(PENDING_BOOKING)}
          >
            <p>Pending appointment</p>
          </div>
        </Col>
        <Col md={9}>Content</Col>
      </Row>
    </Container>
  );
};

const DashboardContent = () => {
  return <div>Dashboard</div>;
};

const MessageContent = () => {
  return <div>Message</div>;
};

const AdminPage = () => {
  const [showMode, setShowMode] = useState(SHOW_BOOKING);

  return (
    <div className="admin-page-wrapper">
      <div className="tab-pane">
        <div
          className={
            showMode === SHOW_BOOKING ? "tab-item selected-tab" : "tab-item"
          }
          onClick={() => setShowMode(SHOW_BOOKING)}
        >
          Booking
        </div>
        <div
          className={
            showMode === SHOW_DASHBOARD ? "tab-item selected-tab" : "tab-item"
          }
          onClick={() => setShowMode(SHOW_DASHBOARD)}
        >
          Dashboard
        </div>
        <div
          className={
            showMode === SHOW_MESSAGE ? "tab-item selected-tab" : "tab-item"
          }
          onClick={() => setShowMode(SHOW_MESSAGE)}
        >
          Message
        </div>
      </div>
      <div className="content-wrapper">
        {showMode === SHOW_BOOKING ? (
          <BookingContent />
        ) : showMode === SHOW_DASHBOARD ? (
          <DashboardContent />
        ) : (
          <MessageContent />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
