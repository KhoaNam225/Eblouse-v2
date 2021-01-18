import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";

import authActions from "../../redux/actions/auth.actions";

const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const LoginForm = ({
  showModal,
  handleHideModal,
  handleModalsTransition,
  setShowModal,
  setShowUserDetailInputModal,
}) => {
  const dispatch = useDispatch();

  const loginWithFacebook = (response) => {
    dispatch(authActions.loginFacebook(response.accessToken));
    setShowModal(false);
    setShowUserDetailInputModal(false);
  };
  const loginWithGoogle = (response) => {
    dispatch(authActions.loginGoogle(response.accessToken));
    setShowModal(false);
    setShowUserDetailInputModal(false);
  };

  return (
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
          <GoogleLogin
            className="google-btn d-flex justify-content-center"
            clientId={GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <button
                className="login-btn"
                style={{
                  backgroundColor: "#ef4f4f",
                }}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <i className="fab fa-google" style={{ marginRight: "1em" }}></i>
                Login with Google
              </button>
            )}
            onSuccess={loginWithGoogle}
            onFailure={(err) => console.log("GOOGLE LOGIN ERROR", err)}
            cookiePolicy="single_host_origin"
          />
          <FacebookLogin
            appId={FB_APP_ID}
            fields="name,email,picture"
            callback={loginWithFacebook}
            onFailure={(err) => console.log("FB LOGIN ERROR", err)}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                className="login-btn"
                style={{ backgroundColor: "#4267B2" }}
              >
                <i
                  className="fab fa-facebook-square"
                  style={{ marginRight: "1em" }}
                ></i>
                Login with Facebook
              </button>
            )}
          />
        </div>
        <div className="login-signup-divider" style={{ marginTop: 20 }}>
          <div className="left"></div>
          <p className="text">Signup</p>
          <div className="right"></div>
        </div>
        <div className="login-signup-box">
          <button
            className="signup-btn"
            onClick={() => handleModalsTransition()}
          >
            <i className="fab fa-google" style={{ marginRight: "1em" }}></i>
            Signup with Google
          </button>
          <button
            className="signup-btn"
            onClick={() => handleModalsTransition()}
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
  );
};

export default LoginForm;
