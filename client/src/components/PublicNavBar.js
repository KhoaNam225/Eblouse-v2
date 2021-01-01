import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../images/ebloue-logo.png";

const PublicNavBar = () => {
  return (
    <div className="Nav-bar">
      <Navbar expand="lg">
        <Navbar.Brand>
          <img
            src={logo}
            alt="Eblouse"
            width="100px"
            // onClick={() => history.push("/")}
          />
        </Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        <Nav>
          {/* <span style={{ padding: "8px" }}>{name}</span> */}
          <Nav.Link href="/">Home Page</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>

          {/* <Nav.Link href="/register">Sign up</Nav.Link> */}

          {/* <Nav.Link href="/login">
            Log out
          </Nav.Link> */}
        </Nav>
      </Navbar>
    </div>
  );
};

export default PublicNavBar;
