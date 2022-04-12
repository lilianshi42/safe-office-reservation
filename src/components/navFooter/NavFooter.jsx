import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { ReactComponent as RiotGamesLogo } from "../../assets/riot-games-logo.svg";
import { HomeOutlined, DesktopOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import "./NavFooter.css";

function NavFooter() {
  return (
    <Navbar bg="light" variant="light" fixed="bottom">
      <Navbar.Brand className="nav-logo">
        <RiotGamesLogo className="logo" />
      </Navbar.Brand>
      <Nav className="me-auto nav-options">
        <Link to="/" className="nav-item">
          <HomeOutlined className="nav-icon" />
          <p className="nav-p">Home</p>
        </Link>
        <Link to="/bookings" className="nav-item">
          <DesktopOutlined className="nav-icon" />
          <p className="nav-p">Bookings</p>
        </Link>
        <Link to="/profile" className="nav-item">
          <UserOutlined className="nav-icon" />
          <p className="nav-p">Profile</p>
        </Link>
      </Nav>
    </Navbar>
  );
}

export default NavFooter;
