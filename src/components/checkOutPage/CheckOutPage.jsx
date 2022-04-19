import { useBookings } from "../../contexts/BookingsContext";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Button } from "antd";

import "./CheckOutPage.styles.css";

//check out page
const CheckOutPage = () => {
  const { currentUser } = useAuth();
  const { userHasBookingThatDay, getBookingByUsernameAndDate, checkOutByUsernameAndDate } = useBookings();
  const [hasBooking, setHasBooking] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const date = moment().format("YYYY-MM-DD");
    //check the user's booking, check-in, and check-out status on that day
    if (userHasBookingThatDay(currentUser.email, date)) {
      setHasBooking(true);
      if (getBookingByUsernameAndDate(currentUser.email, date).checkIn) {
        setCheckedIn(true);
        if (getBookingByUsernameAndDate(currentUser.email, date).checkOut) {
          setCheckedOut(true);
        }
      }
    }
  }, [currentUser]);

  const handleSubmit = async () => {
    try {
      const date = moment().format("YYYY-MM-DD");
      //check out
      await checkOutByUsernameAndDate(currentUser.email, date);
      navigate("/check-out-success");
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="checkout-page">
      <h2>Check Out</h2>
      <div className="checkout-container">
        {hasBooking ? (
          checkedIn === true ? (
            checkedOut === false ? (
              <div>
                <p style={{ textAlign: "center", fontSize: "1.2em" }}>Are you sure you want to check out?</p>
                <div className="buttons-wrapper-in-checkOut" style={{ textAlign: "center", marginTop: "20px" }}>
                  <Button type="primary" onClick={handleSubmit}>
                    Check Out
                  </Button>
                  <Button onClick={handleNavigate} style={{ marginLeft: "20px" }}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <p style={{ textAlign: "center", fontSize: "1.2em" }}>You already checked out!</p>
                <div className="buttons-wrapper-in-checkOut" style={{ textAlign: "center", marginTop: "20px" }}>
                  <Button type="primary" onClick={handleNavigate}>
                    Home
                  </Button>
                </div>
              </div>
            )
          ) : (
            <div>
              <p style={{ textAlign: "center", fontSize: "1.2em" }}>You need to check in first</p>
              <div className="buttons-wrapper-in-checkOut" style={{ textAlign: "center", marginTop: "20px" }}>
                <Button type="primary" onClick={handleNavigate}>
                  Home
                </Button>
              </div>
            </div>
          )
        ) : (
          <div>
            <p style={{ textAlign: "center", fontSize: "1.2em" }}>You don't have any booking today</p>
            <div className="buttons-wrapper-in-checkOut" style={{ textAlign: "center", marginTop: "20px" }}>
              <Button type="primary" onClick={handleNavigate}>
                Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOutPage;
