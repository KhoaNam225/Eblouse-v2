import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import logo from "../images/ebloue-logo.png";
import authActions from "../redux/actions/auth.actions";

import "../style/AdminNavBar.css";

const AdminNavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.loading);

  const UserInfoButton = ({ user }) => {
    const [showActionMenu, setShowActionMenu] = useState(false);

    const handleLogout = () => {
      setShowActionMenu(false);
      dispatch(authActions.logout());
    };

    return (
      <div style={{ position: "relative" }}>
        <button
          className="user-info-button"
          onClick={() => setShowActionMenu(!showActionMenu)}
        >
          <i
            className="fas fa-bars"
            style={{ marginRight: 10, fontSize: "1.1em" }}
          ></i>
          <img className="user-avatar" src={user.avatarUrl} alt="user avatar" />
        </button>
        {showActionMenu ? (
          <div className="user-action-menu">
            <div className="action-item">
              <i className="fas fa-user" style={{ marginRight: 15 }}></i>
              <p style={{ display: "inline" }}>
                <strong>Account setting</strong>
              </p>
            </div>
            <div className="action-item" onClick={handleLogout}>
              <i
                className="fas fa-sign-out-alt"
                style={{ marginRight: 15 }}
              ></i>
              <p style={{ display: "inline" }}>Log out</p>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

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
