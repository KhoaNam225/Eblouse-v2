import React, { useState } from "react";
import { Nav } from "react-bootstrap";

import UserInfoButton from "./UserInfoButton";

const PartialNavBar = ({
  logo,
  isLoading,
  user,
  setShowFullClicked,
  handleShowModal,
}) => {
  return (
    <>
      <div className="nav-bar">
        <div id="logo">
          <img src={logo} alt="Eblouse" width="150px" />
        </div>
        <div className="nav-middle">
          <div
            onClick={() => {
              setShowFullClicked(true);
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

export default PartialNavBar;
