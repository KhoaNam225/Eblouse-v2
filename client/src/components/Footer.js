import React from "react";
import "../style/Footer.css";
import appstore from "../images/appstore.svg";

const Footer = () => {
  return (
    <>
      <footer className="last-thing">
        <div className="container4">
          <div id="box-footer">
            <div className="box-one">
              <ul>
                <li className="list-name list-4">Eblouse</li>
                <li className="list-3">
                  <a href="#">Home</a>
                </li>
                <li className="list-3">
                  <a href="#">About us</a>
                </li>
                <li className="list-3">
                  <a href="#">Press</a>
                </li>
                <li className="list-3">
                  <a href="">Cares</a>
                </li>
                <li className="list-3">
                  <a href="">Contact us</a>
                </li>
                <li className="list-3">
                  <a href="">Help</a>
                </li>
              </ul>
            </div>
            <div className="box-two">
              <ul>
                <li className="list-name list-4">Specialities</li>
                <li className="list-4">
                  <a className="no1" href="">
                    Primary Care Doctor
                  </a>
                </li>
                <li className="list-4">
                  <a href="">Dermatologist</a>
                </li>
                <li className="list-4">
                  <a href="">OB-GYN</a>
                </li>
                <li className="list-4">
                  <a href="">Dentist</a>
                </li>
                <li className="list-4">
                  <a href="">Ear, Nose & Throat Doctor</a>
                </li>
                <li className="list-4">
                  <a href="">Cardiologist</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="app-store">
            <div id="img-app">
              <img className="app" src={appstore} alt="logo-appstore" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
