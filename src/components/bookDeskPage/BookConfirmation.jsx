import React, { useEffect } from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useBookings } from "../../contexts/BookingsContext";
import { useAuth } from "../../contexts/AuthContext";

function BookConfirmation(props) {
  const navigate = useNavigate();
  const { addNewBookings } = useBookings();
  const { currentUser } = useAuth();
  const backHome = () => {
    navigate("/");
  };

  useEffect(() => {
    addNewBookings(
      currentUser.email,
      props.date,
      props.officeSeat,
      props.floor,
      props.officeAddr
    );
  }, []);

  return (
    <Result
      status="success"
      title="Successfully Booked Your Seat!"
      subTitle={`You have successfully booked your seat on ${props.floor} floor, ${props.officeAddr} office, seat number #${props.officeSeat} on ${props.date}. Please make sure to complete your Covid survey prior your arrival and check-out after your leave.`}
      extra={[
        <Button key="home" type="primary" onClick={backHome}>
          Home
        </Button>,
      ]}
    />
  );
}
export default BookConfirmation;
