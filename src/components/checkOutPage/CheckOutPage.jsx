import fakeDB from "../../utils/fakeDB";
import { useBookings } from "../../contexts/BookingsContext";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { Button } from "antd";

import "./CheckOutPage.styles.css";

const CheckOutPage = () => {
  const { currentUser } = useAuth();
  const {userHasBookingThatDay,getBookingByUsernameAndDate} = useBookings();
  const [hasBooking, setHasBooking] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const date = moment().format('YYYY-MM-DD');
    if (userHasBookingThatDay("Tom", date)) {
      setHasBooking(true);
      if (getBookingByUsernameAndDate("Tom", date).checkIn) {
        setCheckedIn(true);
        if(getBookingByUsernameAndDate("Tom", date).checkOut){
            setCheckedOut(true);
        }
      }
    }
  }, [currentUser]);

  const handleSubmit = ()=>{
    alert("Check in successful!");
    navigate("/home");
  }

  const handleNavigate=()=>{
    navigate("/");
  }

  return (
    <div className="checkout-page">
      <h2>Check Out</h2>
      <div className="checkout-container">
        {hasBooking ? (
          checkedIn === true ? (
            <div >
              <p>Are you sure you want to check out?</p>
              <div className="buttons-wrapper-in-checkOut" style={{"marginLeft":"38%","marginTop":"20px"}}>
                <Button  type="primary" onClick={handleSubmit}>Check Out</Button>
                <Button type="danger" onClick={handleNavigate} style={{"marginLeft":"20px"}}>Back to Home</Button>
              </div>
               </div>
            
          ) : (
            <div className="no-checkin">
                <p style={{"textAlign":"center","fontSize":"1.2em"}}>You need to check in first</p>
                <div className="buttons-wrapper-in-checkOut" style={{"marginLeft":"38%","marginTop":"20px"}}>
                <Button  type="primary" onClick={handleSubmit} disabled>Check Out</Button>
                <Button type="danger" onClick={handleNavigate} style={{"marginLeft":"20px"}}>Back to Home</Button>
              </div>
            </div>
          )
        ) : (
          <div className="no-booking" >
                <p style={{"textAlign":"center","fontSize":"1.2em"}}>You don't have any booking today</p>
                <Button  type="primary" onClick={handleSubmit} disabled>Check Out</Button>
                <Button type="danger" onClick={handleNavigate} style={{"marginLeft":"20px"}}>Back to Home</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckOutPage;
