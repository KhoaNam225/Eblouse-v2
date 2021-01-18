import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import UserInfoButton from "./UserInfoButton";
import ReviewsSearchBar from "./ReviewsSearchBar";
import BookingSearchBar from "./BookingSearchBar";

const FullNavBar = ({
  user,
  isLoading,
  scrollOffsetY,
  logo,
  setShowFullClicked,
  handleShowModal,
}) => {
  const BOOKING_SEARCH_MODE = 1;
  const REVIEWS_SEARCH_MODE = 2;
  const [searchMode, setSearchMode] = useState(BOOKING_SEARCH_MODE);

  return (
    <>
      <div className="nav-bar">
        <div id="logo">
          <img src={logo} alt="Eblouse" width="150px" />
        </div>
        <div className="nav-middle">
          <div className="change-modes-btn">
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
                  setShowFullClicked(false);
                }}
              >
                Show Less
              </button>
            ) : null}
          </div>
          {searchMode === BOOKING_SEARCH_MODE ? (
            <BookingSearchBar />
          ) : (
            <ReviewsSearchBar />
          )}
        </div>
        <div className="nav-links">
          <Nav.Link href="/">Home Page</Nav.Link>
          {isLoading ? (
            <Nav.Link>Loading</Nav.Link>
          ) : user == null ? (
            <Nav.Link onClick={handleShowModal}>Login</Nav.Link>
          ) : (
            <UserInfoButton user={user} />
          )}
        </div>
      </div>
    </>
  );
};

export default FullNavBar;
