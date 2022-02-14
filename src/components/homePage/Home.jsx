import React from "react";
import { Button } from "antd";
import "./Home.css";

const HomePage = () => {
  return (
    <div className="home">
      <h1>Hello Welcome</h1>
      <div className="buttons">
        <Button type="default" size="large" block>
          CHECK IN
        </Button>
        <Button type="default" size="large" block>
          CHECK OUT
        </Button>
        <Button type="default" size="large" block>
          BOOK SEAT
        </Button>
        <Button type="default" size="large" block>
          MY BOOKINGS
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
