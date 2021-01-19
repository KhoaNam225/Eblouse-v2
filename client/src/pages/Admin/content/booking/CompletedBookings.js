import React from "react";
import { Container } from "react-bootstrap";
const CompletedBookingCard = ({ booking }) => {
  const startDate = new Date(booking.startTime);
  const endDate = new Date(booking.endTime);

  return (
    <div className="booking-card">
      <div className="doctor-info">
        <img
          className="doctor-avatar"
          src={booking.doctor.avatarUrl}
          alt="Doctor Avatar"
        />
        <p className="doctor-name">
          <strong>Doctor:</strong>{" "}
          {`${booking.doctor.firstName} ${booking.doctor.lastName}`}
        </p>
      </div>
      <div className="patient-info">
        <img
          className="user-avatar"
          src={booking.user.avatarUrl}
          alt="Patient Avatar"
        />

        <p className="patient-name">
          <strong>Patient: </strong> {booking.user.name}
        </p>
      </div>
      <div className="booking-info">
        <p>
          <strong>Date: </strong>
          <span style={{ color: "grey", fontStyle: "italic" }}>
            {startDate.toDateString()}
          </span>
        </p>
        <p>
          <strong>Start time: </strong>
          <span
            style={{ color: "grey", fontStyle: "italic" }}
          >{`${startDate.getHours()}:${startDate.getMinutes()}`}</span>
        </p>
        <p>
          <strong>End time: </strong>
          <span
            style={{ color: "grey", fontStyle: "italic" }}
          >{`${endDate.getHours()}:${endDate.getMinutes()}`}</span>
        </p>
        <p>
          <strong>Reason: </strong>
          <span style={{ fontSize: "0.8em" }}>{booking.reason}</span>
        </p>
      </div>
      <div className="booking-action">
        <p>
          <strong>Status: </strong>
          <span style={{ color: "#0278ae", fontWeight: "bold" }}>
            {booking.status}
          </span>
        </p>
      </div>
    </div>
  );
};

const CompletedBookings = ({ bookings }) => {
  const completedBookings = bookings.filter(
    (booking) => booking.status === "Done"
  );

  return (
    <Container className="booking-card-wrapper" fluid>
      {completedBookings.map((booking) => (
        <CompletedBookingCard booking={booking} key={booking._id} />
      ))}
    </Container>
  );
};

export default CompletedBookings;
