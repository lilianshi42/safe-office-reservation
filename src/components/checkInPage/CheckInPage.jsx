import { useBookings } from "../../contexts/BookingsContext";
import { useFloors } from "../../contexts/FloorsContext";
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

  const { getAllDesksByFloorIdAndDate, getAllDesksByFloorId, getAllFloors, getFloorByFloorId } = useFloors();

  const [hasBooking, setHasBooking] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [answer, setAnswer] = useState([]);

  const navigate = useNavigate();

  const [desks, setDesks] = useState([]);

  useEffect(() => {
    const date = moment().format("YYYY-MM-DD");
    if (userHasBookingThatDay(currentUser.email, date)) {
      setHasBooking(true);
      if (getBookingByUsernameAndDate(currentUser.email, date).checkIn) {
        setCheckedIn(true);
      }
    }
    const desks = getAllDesksByFloorIdAndDate(101, date);
    console.log(desks);
    //getAllDesksByFloorId(101);
    //getFloorByFloorId(101);
    //    getAllFloors();
  }, []);

  const changeAnswer = (values) => setAnswer(values);

  const handleSubmit = async () => {
    try {
      //to do:
      // call check in function
      const date = moment().format("YYYY-MM-DD");
      await checkInByUsernameAndDate(currentUser.email, date);
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
              <CovidSurvey changeAnswer={changeAnswer} />
              <div className="buttons-wrapper-in-checkin" style={{ marginLeft: "38%", marginTop: "20px" }}>
                <Button type="primary" onClick={handleSubmit}>
                  Check In
                </Button>
                <Button onClick={handleNavigate} style={{ marginLeft: "20px" }}>
                  Cancel
                </Button>
              </div>
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
