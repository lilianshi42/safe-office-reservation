import React, { useEffect, useState } from "react";
import FloorPlan from "./FloorPlan";
import SeatBooking from "./SeatBooking";
import { Row, Col, Button, Card, Form, Select, Calendar } from "antd";
import { useNavigate } from "react-router-dom";

function BookForm(props) {
  const [form] = Form.useForm();
  const [officeAddr, setOfficeAddr] = useState(null);
  const [floor, setFloor] = useState(null);
  const [date, setDate] = useState(null);
  const navigate = useNavigate();

  const [stage, setStage]=useState(0);

  const handleBackClick = () => {
   // navigate("/");
    if(stage===0){
      navigate("/");
    }else{
      setStage(stage=>stage-1);
    }
  };
  const handleNextClick = () => {
    setOfficeAddr(form.getFieldValue("officeAddr"));
    setFloor(form.getFieldValue("floor"));
    setDate(form.getFieldValue("date"));
    //navigate("/floorPlan");
    setStage(stage=>stage+1);
  };

  useEffect(() => {
    console.log(floor);
    console.log(officeAddr);
    console.log(date);
  }, [floor, officeAddr, date]);

  return stage===0 ? (
    <Row>
      <Col span={4} style={{ textAlign: "center", marginTop: "3rem", paddingLeft: "5px" }}>
        <Button onClick={handleBackClick} type="primary" shape="round">
          Back
        </Button>
      </Col>
      <Col span={16} style={{ marginTop: "1rem", padding: "5px 5px" }}>
        <Card title="Book New Seat" bordered={false} headStyle={{ fontSize: "2em", textAlign: "center" }}>
          <p style={{ fontSize: "1.3em", padding: "0.8rem" }}>
            <b>Choose Date and Floor to See Available Seats</b>
          </p>
          <Form form={form} layout="vertical" style={{ padding: "0.8rem" }}>
            <Form.Item name="officeAddr" label="Office Address" rules={[{ required: true, message: "Please select office address!" }]}>
              <Select placeholder="select office address">
                <Select.Option value="office1">47W 13th St, Dubai</Select.Option>
                <Select.Option value="office2">123 Toronto Main St, Toronto</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="floor" label="Floor" rules={[{ required: true, message: "Please select a floor!" }]}>
              <Select placeholder="select floor">
                <Select.Option value="5th">5th</Select.Option>
                <Select.Option value="6th">6th</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="date" label="Calendar" rules={[{ required: true, message: "Please select a date!" }]}>
              <Calendar fullscreen={false} style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={4} style={{ textAlign: "center", marginTop: "3rem", paddingRight: "5px" }}>
        <Button onClick={handleNextClick} type="primary" htmlType="submit" shape="round">
          Next
        </Button>
      </Col>
    </Row>
  ) : (
    <FloorPlan floor={floor} handleBackClick={handleBackClick}/>
  );
}

export default BookForm;
