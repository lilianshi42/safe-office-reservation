import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

function CheckOutConfirmation() {
  const navigate = useNavigate();

  const backHome = () => {
    navigate("/");
  };

  return (
    <Result
      status="success"
      title="Check out successful!"
      subTitle={`You have successfully checked out. See you next time!`}
      extra={[
        <Button key="home" type="primary" onClick={backHome}>
          Home
        </Button>,
      ]}
    />
  );
}
export default CheckOutConfirmation;
