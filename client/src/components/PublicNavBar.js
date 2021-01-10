import { Modal, Button, Form, Col, Nav } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import usersActions from "../redux/actions/users.actions";
import logo from "../images/ebloue-logo.png";
import "../style/PublicNavBar.css";

const PublicNavBar = () => {
  const BOOKING_SEARCH_MODE = 1;
  const REVIEWS_SEARCH_MODE = 2;

  const [clinicName, setClinicName] = useState("");
  const [date, setDate] = useState(null);
  const [peopleNum, setPeopleNum] = useState(0);
  const [searchMode, setSearchMode] = useState(BOOKING_SEARCH_MODE);
  const [showFullClicked, setshowFullClicked] = useState(false);
  const [scrollOffsetY, setScrollOffsetY] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showUserDetailInputModal, setShowUserDetailInputModal] = useState(
    false
  );

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const isLoading = useSelector((state) => state.users.isLoading);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollOffsetY(position);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const showUserDetailModal = () => {
    setShowUserDetailInputModal(true);
  };

  const hideUserDetailModal = () => {
    setShowUserDetailInputModal(false);
  };

  const hanelModalsTransition = () => {
    setShowModal(false);
    setShowUserDetailInputModal(true);
  };

  const handleUserLogin = () => {
    dispatch(usersActions.userLogin());
    setShowModal(false);
    setShowUserDetailInputModal(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const FullNavBar = () => {
    return (
      <>
        <div className="nav-bar">
          <div id="logo">
            <img src={logo} alt="Eblouse" width="100px" />
          </div>
          <div className="nav-middle">
            <button
              className="nav-btn"
              onClick={() => setSearchMode(BOOKING_SEARCH_MODE)}
            >
              Book an appointment
            </button>
            <button
              className="nav-btn"
              onClick={() => {
                setSearchMode(REVIEWS_SEARCH_MODE);
              }}
            >
              See reviews
            </button>
            {scrollOffsetY > 0 ? (
              <button
                className="nav-btn"
                onClick={() => {
                  setshowFullClicked(false);
                }}
              >
                Show Less
              </button>
            ) : null}
          </div>
          <div className="nav-links">
            <Nav.Link href="/">Home Page</Nav.Link>
            {isLoading ? (
              <Nav.Link>Loading</Nav.Link>
            ) : user == null ? (
              <Nav.Link onClick={handleShowModal}>Login</Nav.Link>
            ) : (
              <Nav.Link>{user.firstName}</Nav.Link>
            )}
          </div>
        </div>
        {searchMode === BOOKING_SEARCH_MODE ? (
          <BookingSearchBar />
        ) : (
          <ReviewsSearchBar />
        )}
      </>
    );
  };

  const PartialNavBar = () => {
    return (
      <>
        <div className="nav-bar">
          <div id="logo">
            <img src={logo} alt="Eblouse" width="100px" />
          </div>
          <div className="nav-middle">
            <div
              onClick={() => {
                setshowFullClicked(true);
              }}
              className="show-full-nav-btn"
            >
              <p>Start your search</p>
              <div className="search-btn-show-full">
                <i className="fas fa-search"></i>
              </div>
            </div>
          </div>
          <div className="nav-links">
            <Nav.Link href="/">Home Page</Nav.Link>
            <Nav.Link onClick={handleShowModal}>Login</Nav.Link>
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      className={
        scrollOffsetY > 0 ? "nav-wrapper-full nav-scrolled" : "nav-wrapper-full"
      }
    >
      {scrollOffsetY > 0 && !showFullClicked ? (
        <PartialNavBar />
      ) : (
        <FullNavBar />
      )}

      <Modal show={showModal} onHide={handleHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="login-signup-divider">
            <div className="left"></div>
            <p className="text">Login</p>
            <div className="right"></div>
          </div>
          <div className="login-signup-box">
            <button
              className="login-btn"
              style={{
                backgroundColor: "#ef4f4f",
              }}
              onClick={() => handleUserLogin()}
            >
              <i className="fab fa-google" style={{ marginRight: "1em" }}></i>
              Login with Google
            </button>
            <button
              onClick={() => handleUserLogin()}
              className="login-btn"
              style={{ backgroundColor: "#4267B2" }}
            >
              <i
                className="fab fa-facebook-square"
                style={{ marginRight: "1em" }}
              ></i>
              Login with Facebook
            </button>
          </div>
          <div className="login-signup-divider" style={{ marginTop: 20 }}>
            <div className="left"></div>
            <p className="text">Signup</p>
            <div className="right"></div>
          </div>
          <div className="login-signup-box">
            <button
              className="signup-btn"
              onClick={() => hanelModalsTransition()}
            >
              <i className="fab fa-google" style={{ marginRight: "1em" }}></i>
              Signup with Google
            </button>
            <button
              className="signup-btn"
              onClick={() => hanelModalsTransition()}
            >
              <i
                className="fab fa-facebook-square"
                style={{ marginRight: "1em" }}
              ></i>
              Signup with Facebook
            </button>
          </div>
        </Modal.Body>
      </Modal>

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
    </div>
  );
};

const BookingSearchBar = ({
  clinicName,
  setClinicName,
  date,
  setDate,
  peopleNum,
  setPeopleNum,
  onSubmit,
}) => {
  return (
    <div className="search-box">
      <form onSubmit={onSubmit} className="search-form">
        <div
          id="location-input-box"
          className="search-component"
          onFocus={() => {
            const box = document.getElementById("location-input-box");
            box.classList.add("right-shadow-box");
          }}
          onBlur={() => {
            const box = document.getElementById("location-input-box");
            box.classList.remove("right-shadow-box");
          }}
        >
          <label>Location</label>
          <input type="text" value={clinicName} placeholder="Clinic name" />
        </div>
        <div className="split-bar"></div>
        <div
          id="date-input-box"
          className="search-component"
          onFocus={() => {
            const box = document.getElementById("date-input-box");
            box.classList.add("both-side-shadow-box");
          }}
          onBlur={() => {
            const box = document.getElementById("date-input-box");
            box.classList.remove("both-side-shadow-box");
          }}
        >
          <label>Date</label>
          <input type="date" value={date} style={{ color: "grey" }} />
        </div>
        <div className="split-bar"></div>
        <div
          id="num-people-input-box"
          className="box-with-search-btn"
          onFocus={() => {
            const box = document.getElementById("num-people-input-box");
            box.classList.add("left-shadow-box");
          }}
          onBlur={() => {
            const box = document.getElementById("num-people-input-box");
            box.classList.remove("left-shadow-box");
          }}
        >
          <div className="search-component">
            <label>Number of people</label>
            <input
              type="number"
              min={0}
              value={peopleNum}
              placeholder="How many people?"
            />
          </div>
          <button type="submit" className="submit-btn">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

const ReviewsSearchBar = ({ clinicName, setClinicName, onSubmit }) => {
  return (
    <div className="search-box">
      <form onSubmit={onSubmit} className="search-form">
        <div
          id="clinic-name-input-box"
          className="box-with-search-btn"
          onFocus={() => {
            const box = document.getElementById("clinic-name-input-box");
            box.classList.add("both-side-shadow-box");
          }}
          onBlur={() => {
            const box = document.getElementById("clinic-name-input-box");
            box.classList.remove("both-side-shadow-box");
          }}
        >
          <div className="search-component">
            <label>Clinic name</label>
            <input
              type="text"
              value={clinicName}
              placeholder="Enter clinic name here"
            />
          </div>
          <button type="submit" className="submit-btn">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublicNavBar;
