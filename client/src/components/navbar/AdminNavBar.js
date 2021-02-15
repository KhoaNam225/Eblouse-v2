/**
 * Author: Khoa Nam Pham
 * File name: AdminNavBar.js
 * Last Modified Date: 15/2/2021
 * Purpose:   This component is used to display the Navbar for Admin User.
 */
import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import logo from "../../images/ebloue-logo.png";
import UserInfoButton from "./UserInfoButton";

import "../../style/AdminNavBar.css";

/**
 * The Navigation Bar for users who are Admins of clinics
 */
const AdminNavBar = () => {
  const user = useSelector((state) => state.auth.user); // Current user infor
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
