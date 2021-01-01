import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
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

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollOffsetY(position);
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
            <Nav.Link href="/login">Login</Nav.Link>
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
            <Nav.Link href="/login">Login</Nav.Link>
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
