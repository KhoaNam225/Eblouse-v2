import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import LoadingSpinner from "../../components/LoadingSpinner";
import bookingsActions from "../../redux/actions/bookings.actions";

const BookingTimeTable = ({
  doctorId,
  bookingsList,
  date,
  setStartTime,
  startTime,
}) => {
  const activeBookings = bookingsList.filter(
    (booking) => booking.status === "Pending" || booking.status === "Accepted"
  );

  const bookingsByDate = activeBookings.filter((booking) => {
    const startDate = booking.startTime.split("T")[0];
    return startDate === date.toISOString().split("T")[0];
  });

  const bookingsByDoctor = bookingsByDate.filter(
    (booking) => booking.doctor._id === doctorId
  );

  const occupiedTimeSlot = bookingsByDoctor.map((booking) => {
    return new Date(booking.startTime).getHours();
  });

  const checkedOccupiedTimeSlot = (time) => {
    for (let i = 0; i < occupiedTimeSlot.length; i++) {
      if (occupiedTimeSlot[i] === time) return true;
    }

    return false;
  };

  return (
    <div className="booking-time-table">
      <button
        className={
          checkedOccupiedTimeSlot(8)
            ? "disabled"
            : startTime === 8
            ? "selected"
            : "booking-time-input"
        }
        disabled={checkedOccupiedTimeSlot(8)}
        onClick={(e) => {
          e.preventDefault();
          setStartTime(8);
        }}
      >
        8:00 - 9:00
      </button>
      <button
        className={
          checkedOccupiedTimeSlot(9)
            ? "disabled"
            : startTime === 9
            ? "selected"
            : "booking-time-input"
        }
        disabled={checkedOccupiedTimeSlot(9)}
        onClick={(e) => {
          e.preventDefault();
          setStartTime(9);
        }}
      >
        9:00 - 10:00
      </button>
      <button
        className={
          checkedOccupiedTimeSlot(10)
            ? "disabled"
            : startTime === 10
            ? "selected"
            : "booking-time-input"
        }
        disabled={checkedOccupiedTimeSlot(10)}
        onClick={(e) => {
          e.preventDefault();
          setStartTime(10);
        }}
      >
        10:00 - 11:00
      </button>
      <button
        className={
          checkedOccupiedTimeSlot(13)
            ? "disabled"
            : startTime === 13
            ? "selected"
            : "booking-time-input"
        }
        disabled={checkedOccupiedTimeSlot(13)}
        onClick={(e) => {
          e.preventDefault();
          setStartTime(13);
        }}
      >
        13:00 - 14:00
      </button>
      <button
        className={
          checkedOccupiedTimeSlot(14)
            ? "disabled"
            : startTime === 14
            ? "selected"
            : "booking-time-input"
        }
        disabled={checkedOccupiedTimeSlot(14)}
        onClick={(e) => {
          e.preventDefault();
          setStartTime(14);
        }}
      >
        14:00 - 15:00
      </button>
      <button
        className={
          checkedOccupiedTimeSlot(15)
            ? "disabled"
            : startTime === 15
            ? "selected"
            : "booking-time-input"
        }
        disabled={checkedOccupiedTimeSlot(15)}
        onClick={(e) => {
          e.preventDefault();
          setStartTime(15);
        }}
      >
        15:00 - 16:00
      </button>
    </div>
  );
};

const BookingCreateForm = ({ doctors, clinicId }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]._id);
  const [visitReason, setVisitReason] = useState("");
  const [bookingDate, setBookingDate] = useState(new Date());
  const [startTime, setStartTime] = useState(0);

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.bookings.isLoading);
  const bookings = useSelector((state) => state.bookings.bookings);

  useEffect(() => {
    dispatch(bookingsActions.getBookingsList(clinicId));
  }, [dispatch]);

  const handleSelectDoctor = (e) => {
    setSelectedDoctor(e.target.value);
    setStartTime(0);
  };

  const handleChangeReason = (e) => {
    setVisitReason(e.target.value);
  };

  const handleDateChange = (e) => {
    console.log(e.target.value);
    setBookingDate(new Date(e.target.value));
    setStartTime(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDoctor) {
      e.stopPropagation();
      toast.error("Please select a doctor");
    } else if (visitReason === "") {
      e.stopPropagation();
      toast.error("Please enter a reason for your appointment");
    } else if (!bookingDate) {
      e.stopPropagation();
      toast.error("Please select a date for your appointment");
    } else if (startTime === 0) {
      e.stopPropagation();
      toast.error("Please select a time for your appointment");
    } else {
      bookingDate.setHours(startTime, 0, 0);
      const endTime = new Date(bookingDate.getTime() + 3600 * 1000);

      const bookingInfo = {};
      bookingInfo.clinicId = clinicId;
      bookingInfo.doctor = selectedDoctor;
      bookingInfo.startTime = bookingDate;
      bookingInfo.endTime = endTime;
      bookingInfo.reason = visitReason;

      const accessToken = localStorage.getItem("accessToken");
      dispatch(bookingsActions.createBookingRequest(bookingInfo, accessToken));
      setStartTime(0);
    }
  };

  return (
    <div className="booking">
      <div className="booking-box">
        <h3 style={{ padding: "20px 0px" }}>Booking an Appoinment</h3>
        {isLoading ? (
          <LoadingSpinner animation="border" color="danger" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="bookingForm.Reason">
              <Form.Label>What is the reason for your visit?</Form.Label>
              <Form.Control
                type="text"
                placeholder="Reason for visiting"
                value={visitReason}
                onChange={handleChangeReason}
              />
            </Form.Group>
            <Form.Group controlId="bookingForm.Doctor">
              <Form.Label>Choose your doctor</Form.Label>
              <Form.Control
                as="select"
                onChange={handleSelectDoctor}
                value={selectedDoctor}
              >
                {doctors.map((doctor, index) => (
                  <option
                    key={index}
                    value={doctor._id}
                  >{`${doctor.firstName} ${doctor.lastName}`}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="bookingForm.Date">
              <Form.Label>
                <strong>Pick a date</strong>
              </Form.Label>
              <Form.Row>
                <Form.Control
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={bookingDate.toISOString().split("T")[0]}
                  onChange={handleDateChange}
                  className="booking-date-input"
                />
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <BookingTimeTable
                doctorId={selectedDoctor}
                bookingsList={bookings}
                date={bookingDate}
                startTime={startTime}
                setStartTime={setStartTime}
              />
            </Form.Group>
            <button className="booking-form-submit-btn" type="submit">
              Book
            </button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default BookingCreateForm;
