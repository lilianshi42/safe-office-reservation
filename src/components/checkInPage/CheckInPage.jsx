import fakeDB from "../../utils/fakeDB";

import CovidSurvey from "../covidSurvey/CovidSurvey.component";

import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

import { Button } from "antd";

import "./CheckInPage.styles.css";

function CheckInPage() {
  const { currentUser } = useAuth();

  const [hasBooking, setHasBooking] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [answer,setAnswer] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const date = "2022-04-03";
    if (fakeDB.userHasBookingThatDay("Tom", date)) {
      setHasBooking(true);
      if (fakeDB.getBookingByUsernameAndDate("Tom", date).checkedIn) {
        setCheckedIn(true);
      }
    }
  }, [currentUser]);

  const changeAnswer = values=>setAnswer(values);

  const handleSubmit = ()=>{
    console.log(`answer is ${answer}`);
    console.log(`currentUser is ${currentUser}`);
    alert("Check in successful!");
    navigate("/home");
  }

  const handleNavigate=()=>{
    navigate("/");
  }

  return (
    <div className="checkin-page">
      <h2>Check In</h2>
      <div className="checkin-container">
        {hasBooking ? (
          checkedIn === false ? (
            <div >
              <CovidSurvey changeAnswer={changeAnswer}/>
              <div className="buttons-wrapper-in-checkin" style={{"marginLeft":"38%","marginTop":"20px"}}>
                <Button  type="primary" onClick={handleSubmit}>Check In</Button>
                <Button type="danger" onClick={handleNavigate} style={{"marginLeft":"20px"}}>Back to Home</Button>
              </div>
               </div>
            
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
