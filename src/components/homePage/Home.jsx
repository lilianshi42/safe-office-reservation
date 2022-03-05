import React from "react";
import { Button } from "antd";
import "./Home.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function HomePage() {
  const { currentUser } = useAuth();

  return (
    <div className="home">
      <h1>Hello Welcome {currentUser ? currentUser.displayName : ""}</h1>
      <div className="buttons">
        <Link to="/checkin">
          <Button type="default" size="large" block>
            CHECK IN
          </Button>
        </Link>
        <Button type="default" size="large" block>
          CHECK OUT
        </Button>
        <Link to="/bookDesk">
          <Button type="default" size="large" block>
            BOOK SEAT
          </Button>
        </Link>
        <Link to="/bookings">
          <Button type="default" size="large" block>
            MY BOOKINGS
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
