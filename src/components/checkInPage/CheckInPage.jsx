import fakeDB from "../../utils/fakeDB";

import CovidSurvey from "../covidSurvey/CovidSurvey.component";

import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import "./CheckInPage.styles.css";

function CheckInPage() {
  const { currentUser } = useAuth();

  const [hasBooking, setHasBooking] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  useEffect(() => {
    const date = "2022-04-03";
    if (fakeDB.userHasBookingThatDay("Tom", date)) {
      setHasBooking(true);
      if (fakeDB.getBookingByUsernameAndDate("Tom", date).checkedIn) {
        setCheckedIn(true);
      }
    }
  }, [currentUser]);

  return (
    <div className="checkin-page">
      <h2>Check In</h2>
      <div className="checkin-container">
        {hasBooking ? (
          checkedIn === false ? (
            <CovidSurvey />
          ) : (
            <div className="already-checkin">You already checked in today</div>
          )
        ) : (
          <div className="no-checkin">You don't have any booking today</div>
        )}
      </div>
    </div>
  );
}

export default CheckInPage;
