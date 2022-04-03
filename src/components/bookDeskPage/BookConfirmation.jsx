import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

function BookConfirmation(props) {
  const navigate = useNavigate();
  const backHome = () => {
    navigate("/");
  };

  return (
    <Result
      status="success"
      title="Successfully Booked Your Seat!"
      subTitle={`You have successfully booked your seat on ${props.floor} floor, ${props.officeAddr} office on ${props.date}. Please make sure to complete your Covid survey prior your arrival and check-out after your leave.`}
      extra={[
        <Button key="home" type="primary" onClick={backHome}>
          Home
        </Button>,
      ]}
    />
  );
}
export default BookConfirmation;
