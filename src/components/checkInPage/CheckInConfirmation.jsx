import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

//renders when check in successfully
function CheckInConfirmation() {
  const navigate = useNavigate();

  const backHome = () => {
    navigate("/");
  };

  return (
    <Result
      status="success"
      title="Check in successful!"
      subTitle={`You have successfully completed your Covid survey and checked in, please check-out after your leave.`}
      extra={[
        <Button key="home" type="primary" onClick={backHome}>
          Home
        </Button>,
      ]}
    />
  );
}
export default CheckInConfirmation;
