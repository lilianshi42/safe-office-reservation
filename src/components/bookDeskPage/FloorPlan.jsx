import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";

function FloorPlan(props) {
    //const [floor, setFloor] = useState(props.floor);
    
    const navigate = useNavigate();
    // const handleBackClick = () => {
    //     navigate("/");
    // }
    const handleNextClick = () => {
        navigate("/seatSelect");
    }

    useEffect(() => {
        //console.log(props);
    }, []);

  return (
    <Row>
      <Col span={4} style={{ textAlign: "center", marginTop: "3rem", paddingLeft: "5px" }}>
        {/* <Button onClick={handleBackClick} type="primary" shape="round"> */}
        <Button onClick={props.handleBackClick} type="primary" shape="round">
          Back
        </Button>
      </Col>
      <Col span={16} style={{ marginTop: "1rem", padding: "5px 5px" }}>
        <Card title="Floor Plan" bordered={false} headStyle={{ fontSize: "2em", textAlign: "center" }}>
          You selected {props.floor} floor
        </Card>
      </Col>
      <Col span={4} style={{ textAlign: "center", marginTop: "3rem", paddingRight: "5px" }}>
        <Button onClick={handleNextClick} type="primary" htmlType="submit" shape="round">
          Next
        </Button>
      </Col>
    </Row>
  );
}

export default FloorPlan;
