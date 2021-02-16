/**
 * Author:
 * File name: DashboardContent.js
 * Last date modified:
 * Purpose:   This component is used to display some charts and graphs related to
 *          sale data of a clinic (used in Admin mode)
 */
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

import BookingTrendHour from "./BookingTrendHour";
import BookingTrendMonth from "./BookingTrendMonth";

// Some types of charts that the user can see
const BOOKING_TREND_HOUR = 1; // Display a pie chart showing some trend in hour that clients usually make a booking
const BOOKING_TREND_MONTH = 2; // Display sale growth over months

/**
 * The Content of the dashboard page.
 */
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
      {/* Depends on the display type that we will show the appropriate chart */}
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
