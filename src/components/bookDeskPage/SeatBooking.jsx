import React from "react";
import { Row, Col, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";

function SeatBooking(props) {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    }
    const handleFinishClick = () => {
        console.log("Booking completed!");
    }
  return (
    <Row>
      <Col span={4} style={{ textAlign: "center", marginTop: "3rem", paddingLeft: "5px" }}>
        <Button onClick={handleBackClick} type="primary" shape="round">
          Back
        </Button>
      </Col>
      <Col span={16} style={{ marginTop: "1rem", padding: "5px 5px" }}>
        <Card title="Select A Seat" bordered={false} headStyle={{ fontSize: "2em", textAlign: "center" }}>
          this is seat booking page
        </Card>
      </Col>
      <Col span={4} style={{ textAlign: "center", marginTop: "3rem", paddingRight: "5px" }}>
        <Button onClick={handleFinishClick} type="primary" htmlType="submit" shape="round">
          Finish
        </Button>
      </Col>
    </Row>
  );
}

export default SeatBooking;
