import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../images/ebloue-logo.png";
import authActions from "../../redux/actions/auth.actions";
import UserInfoButton from "./UserInfoButton";

import "../../style/AdminNavBar.css";

const AdminNavBar = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.loading);

  return (
    <div className="nav-bar">
      <div id="logo">
        <img src={logo} alt="Eblouse" width="150px" />
      </div>
      <div className="nav-links">
        <Nav.Link>
          <i className="fas fa-bell admin-icons"></i>
        </Nav.Link>
        <Nav.Link>
          <i className="fas fa-envelope admin-icons"></i>
        </Nav.Link>
        <Nav.Link>
          <i className="fas fa-question-circle admin-icons"></i>
        </Nav.Link>
        {isLoading ? (
          <Nav.Link>Loading</Nav.Link>
        ) : user == null ? (
          <Nav.Link>Login</Nav.Link>
        ) : (
          <UserInfoButton user={user} />
        )}
      </div>
    </div>
  );
};

export default AdminNavBar;
