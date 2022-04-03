import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card } from "antd";
import floor1 from "../../assets/floor-plans/floor1.jpg";
import floor2 from "../../assets/floor-plans/floor2.png";

function FloorPlan(props) {
  useEffect(() => {
    //console.log(props);
  }, []);

  return (
    <Row>
      <Col span={4} style={{ textAlign: "center", marginTop: "3rem", paddingLeft: "5px" }}>
        <Button onClick={props.handleBackClick} type="primary" shape="round">
          Back
        </Button>
      </Col>
      <Col span={16} style={{ textAlign: "center", marginTop: "1rem", padding: "5px 5px" }}>
        <Card title="Floor Plan" bordered={false} headStyle={{ fontSize: "2em", textAlign: "center" }}>
          <Row>
            <Col span={8}>
              Date: <b>{props.date}</b>
            </Col>
            <Col span={8}>
              Office: <b>{props.officeAddr}</b>
            </Col>
            <Col span={8}>
              Floor: <b>{props.floor}</b>
            </Col>
          </Row>
          <Row>
            <img alt="5th-floor-plan" src={floor1} />
            <img alt="6th-floor-plan" src={floor2} />
          </Row>
        </Card>
      </Col>
      <Col span={4} style={{ textAlign: "center", marginTop: "3rem", paddingRight: "5px" }}>
        <Button type="primary" htmlType="submit" shape="round">
          Next
        </Button>
      </Col>
    </Row>
  );
}

export default FloorPlan;
