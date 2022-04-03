import React, { useState } from "react";
import { Row, Col, Button, Card } from "antd";
import BookConfirmation from "./BookConfirmation";

function SeatBooking(props) {
  const [isFinished, setIsFinished] = useState(false);

  const handleFinishClick = () => {
    setIsFinished(true);
  };
  return !isFinished ? (
    <Row>
      <Col span={4} style={{ textAlign: "center", marginTop: "3rem", paddingLeft: "5px" }}>
        <Button onClick={props.handleBackClick} type="primary" shape="round">
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
  ) : (
    <BookConfirmation date={props.date} officeAddr={props.officeAddr} floor={props.floor} />
  );
}

export default SeatBooking;
