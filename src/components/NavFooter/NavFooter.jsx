import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { ReactComponent as RiotGamesLogo } from "../../assets/riot-games-logo.svg";
import { HomeOutlined, DesktopOutlined, UserOutlined } from "@ant-design/icons";

import "./NavFooter.css";



function NavFooter() {
  return (
    <Navbar bg="light" variant="light" fixed="bottom">
      <Navbar.Brand className="nav-logo">
        <RiotGamesLogo className="logo" />
      </Navbar.Brand>
      <Nav className="me-auto nav-options">
        <Nav.Link className="nav-item" href="/home">
          <HomeOutlined className="nav-icon" />
          <p className="nav-p">Home</p>
        </Nav.Link>
        <Nav.Link className="nav-item" href="/desk">
          <DesktopOutlined className="nav-icon" />
          <p className="nav-p">Desk</p>
        </Nav.Link>
        <Nav.Link className="nav-item" href="/profile">
          <UserOutlined className="nav-icon" />
          <p className="nav-p">Profile</p>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavFooter;
