import React, { useEffect } from "react";
import { Button } from "antd";
import "./Home.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useBookings } from "../../contexts/BookingsContext";

function HomePage() {
  const { currentUser } = useAuth();
  const { displayName } = currentUser;
  const { refreshData } = useBookings();

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="home">
      <h1>Hello Welcome! {currentUser ? displayName : ""}</h1>
      <div className="buttons">
        <Link to="/check-in">
          <Button type="default" size="large" name="check-in" block>
            CHECK IN
          </Button>
        </Link>
        <Link to="/check-out">
          <Button type="default" size="large" block>
            CHECK OUT
          </Button>
        </Link>
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
