import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import authActions from "../../redux/actions/auth.actions";

import avatar_placeholder from "../../images/avatar_placeholder.png";

const UserInfoButton = ({ user }) => {
  const [showActionMenu, setShowActionMenu] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    setShowActionMenu(false);
    dispatch(authActions.logout());
  };

  const handleOpenAccountSetting = () => {
    if (user.isAdmin === true) {
      history.push("/admin");
    }
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
        <img
          className="user-avatar"
          src={user.avatarUrl ? user.avatarUrl : avatar_placeholder}
          alt="user avatar"
        />
      </button>
      {showActionMenu ? (
        <div className="user-action-menu">
          <div className="action-item" onClick={handleOpenAccountSetting}>
            <i className="fas fa-user" style={{ marginRight: 15 }}></i>
            <p style={{ display: "inline" }}>
              <strong>Account setting</strong>
            </p>
          </div>
          <div className="action-item" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt" style={{ marginRight: 15 }}></i>
            <p style={{ display: "inline" }}>Log out</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserInfoButton;
