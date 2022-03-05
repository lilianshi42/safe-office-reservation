import React from "react";
import fakeDB from "../../utils/fakeDB";
import { Row, Col, Button } from "antd";
import "./BookDesk.css";

function BookDeskPage() {
  const floors = fakeDB.getAllFloors();

  return (
    <div className="book-desk-page">
      <Row>
        <Col span={4} style={{ textAlign: "center", marginTop: "30px", paddingLeft: "5px" }}>
          <Button type="primary" shape="round">
            Back
          </Button>
        </Col>
        <Col span={16}></Col>
        <Col span={4} style={{ textAlign: "center", marginTop: "30px", paddingRight: "5px" }}>
          <Button type="primary" shape="round">
            Next
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default BookDeskPage;
