import fakeDB from "../../utils/fakeDB";

import { Form, Input, Button,DatePicker, Space,Select } from 'antd';

import "./BookDesk.css";

const BookDeskPage = ()=>{

    const floors = fakeDB.getAllFloors();

    function onChange(date, dateString) {
        console.log(date, dateString);
      }
    
    const { Option } = Select;

    return (
      <div className="book-desk-page">
        <h2>BOOK NEW SEAT</h2>
        <div className="date-floor-container">
          <h3>Choose Date And Floor To See Available Seats</h3>
          <Form layout="vertical">
            <Form.Item
              label="Office Address"
              required
              tooltip="This is a required field"
            >
              <Select name="address" id="address">
                <Option value="address1">1750 Finch Avenue East</Option>
                <Option value="address2">13990 Dufferin Street</Option>
              </Select>

            </Form.Item>
            <Form.Item
              label="Floor"
              required
              tooltip="This is a required field"
            >
              <Select name="floor" id="floor">
                  {
                      floors.map(floor=><Option key={floor.id} value={floor.id}>{floor.floorName}</Option>)
                  }
              </Select>
            </Form.Item>
            <Form.Item
              label="Calendar"
              required
              tooltip="This is a required field"
            >
              {" "}
              <Space>
                <DatePicker onChange={onChange} />
              </Space>
            </Form.Item>

            <Form.Item>
              <Button type="primary">Next</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );

}

export default BookDeskPage;