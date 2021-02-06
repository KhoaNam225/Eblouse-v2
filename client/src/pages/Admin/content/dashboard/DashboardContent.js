import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

import BookingTrendHour from "./BookingTrendHour";
import BookingTrendMonth from "./BookingTrendMonth";

const BOOKING_TREND_HOUR = 1;
const BOOKING_TREND_MONTH = 2;

const DashboardContent = () => {
  const [mode, setMode] = useState(BOOKING_TREND_MONTH);

  return (
    <Row>
      <Col md={3}>
        <div
          className={
            mode === BOOKING_TREND_MONTH
              ? "admin-menu-item selected-admin-mode"
              : "admin-menu-item"
          }
          onClick={() => setMode(BOOKING_TREND_MONTH)}
        >
          Sales Analysis
        </div>
        <div
          className={
            mode === BOOKING_TREND_HOUR
              ? "admin-menu-item selected-admin-mode"
              : "admin-menu-item"
          }
          onClick={() => setMode(BOOKING_TREND_HOUR)}
        >
          Booking Time Analysis
        </div>
      </Col>
      <Col md={9}>
        {mode === BOOKING_TREND_HOUR ? (
          <BookingTrendHour />
        ) : (
          <BookingTrendMonth />
        )}
      </Col>
    </Row>
  );
};

export default DashboardContent;
