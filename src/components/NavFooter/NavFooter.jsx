import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import { ReactComponent as RiotGamesLogo } from "../../assets/riot-games-logo.svg";
import { HomeOutlined, DesktopOutlined, UserOutlined } from "@ant-design/icons";

import "./NavFooter.css";

const NavFooter = () => {
  return (
    <Navbar bg="light" variant="light" fixed="bottom">
      <Container>
        <Navbar.Brand>
          <RiotGamesLogo style={{fontSize:4}}/>
        </Navbar.Brand>
        <Nav className="me-auto nav-options">
          <Nav.Link href="#">
            <HomeOutlined style={{ fontSize: "400%" }} />
          </Nav.Link>
          <Nav.Link href="#">
            <DesktopOutlined style={{ fontSize: "400%" }} />
          </Nav.Link>
          <Nav.Link href="#">
            <UserOutlined style={{ fontSize: "400%" }} />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavFooter;
