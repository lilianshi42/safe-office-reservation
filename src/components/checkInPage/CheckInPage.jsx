import { useBookings } from "../../contexts/BookingsContext";

import CovidSurvey from "../covidSurvey/CovidSurvey.component";
import moment from "moment";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import { Button } from "antd";

import "./CheckInPage.styles.css";

function CheckInPage() {
  const { currentUser } = useAuth();
  const { userHasBookingThatDay, getBookingByUsernameAndDate, checkInByUsernameAndDate } = useBookings();
  
  const [hasBooking, setHasBooking] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [answer, setAnswer] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const date = moment().format("YYYY-MM-DD");
    if (userHasBookingThatDay(currentUser.email, date)) {
      setHasBooking(true);
      if (getBookingByUsernameAndDate(currentUser.email, date).checkIn) {
        setCheckedIn(true);
      }
    }
  }, []);

  const changeAnswer = (values) => setAnswer(values);

  const handleSubmit = async (answer) => {
    try {

      const date = moment().format("YYYY-MM-DD");
      await checkInByUsernameAndDate(currentUser.email, date,answer);
      navigate("/check-in-success");
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="checkin-page">
      <h2>Check In</h2>
      <div className="checkin-container">
        {hasBooking ? (
          checkedIn === false ? (
            <div>
              <CovidSurvey changeAnswer={changeAnswer} handleSubmit={handleSubmit} handleNavigate={handleNavigate}/>
            </div>
          ) : (
            <>
              <div>
                <p style={{ textAlign: "center", fontSize: "1.2em" }}>You already checked in today!</p>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <Button type="primary" onClick={handleNavigate}>
                    Home
                  </Button>
                </div>
              </div>
            </>
          )
        ) : (
          <>
            <div>
              <p style={{ textAlign: "center", fontSize: "1.2em" }}>You don't have any bookings today!</p>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Button type="primary" onClick={handleNavigate}>
                  Home
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CheckInPage;
