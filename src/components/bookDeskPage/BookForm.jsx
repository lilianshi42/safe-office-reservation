import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card, Form, Select, Calendar } from "antd";

function BookForm(props) {
  const [form] = Form.useForm();
  const [officeAddr, setOfficeAddr] = useState(null);
  const [floor, setFloor] = useState(null);
  const [date, setDate] = useState(null);

  const onSubmit = () => {
    console.log(floor);
  };

  useEffect(() => {
    setOfficeAddr(form.getFieldValue("officeAddr"));
    setFloor(form.getFieldValue("floor"));
    setDate(form.getFieldValue("date"));
  }, [form, floor]);

  return (
    <Row>
      <Col span={4} style={{ textAlign: "center", marginTop: "3rem", paddingLeft: "5px" }}>
        <Button type="primary" shape="round">
          Back
        </Button>
      </Col>
      <Col span={16} style={{ marginTop: "5rem", padding: "5px 5px" }}>
        <Card title="Book New Seat" bordered={false} headStyle={{ fontSize: "2em", textAlign: "center" }}>
          <p style={{ fontSize: "1.3em", padding: "1rem" }}>
            <b>Choose Date and Floor to See Available Seats</b>
          </p>
          <Form form={form} layout="vertical" style={{ padding: "1rem" }}>
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
        <Button onClick={onSubmit} type="primary" htmlType="submit" shape="round">
          Next
        </Button>
      </Col>
    </Row>
  );
}

export default BookForm;
