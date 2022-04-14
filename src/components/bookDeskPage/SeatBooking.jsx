import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card } from "antd";
import BookConfirmation from "./BookConfirmation";
import { useFloors } from "../../contexts/FloorsContext";
import { Select } from "antd";
import floor1 from "../../assets/floor-plans/floor1.jpg";
import floor2 from "../../assets/floor-plans/floor2.png";

function SeatBooking(props) {
  const [isFinished, setIsFinished] = useState(false);
  const [officeSeat, setOfficeSeat] = useState(null);
  const [availableSeat, setAvailableSeat] = useState([]);
  const { getAllDesksByLocationAndDate, updateSelectedSeatIntoDB } =
    useFloors();
  const { Option } = Select;

  useEffect(() => {
    setAvailableSeat(
      getAllDesksByLocationAndDate(props.officeAddr, props.date)
    );
  }, []);

  const handleFinishClick = () => {
    if (officeSeat === null) {
      alert("You need to select an office seat");
    } else {
      updateSelectedSeatIntoDB(props.officeAddr, officeSeat, props.date);
      setIsFinished(true);
    }
  };

  function handleChange(value) {
    setOfficeSeat(value);
  }
  return !isFinished ? (
    <Row>
      <Col
        span={4}
        style={{ textAlign: "center", marginTop: "3rem", paddingLeft: "5px" }}
      >
        <Button onClick={props.handleBackClick} type="primary" shape="round">
          Back
        </Button>
      </Col>
      <Col span={16} style={{ marginTop: "1rem", padding: "5px 5px" }}>
        <Card
          title="Select A Seat"
          bordered={false}
          headStyle={{ fontSize: "2em", textAlign: "center" }}
        >
          <Col className="seat-select-container">
            <Row className="my-3">
              {props.floor === "5th" ? (
                <img className="floor-img" alt="5th-floor-plan" src={floor1} />
              ) : (
                <img className="floor-img" alt="6th-floor-plan" src={floor2} />
              )}
            </Row>
            <Row>
              {availableSeat.length === 0 ? (
                <div>
                  no available seat this team, please go back and choose your
                  office again
                </div>
              ) : (
                <Select
                  defaultValue={`choose your seat number*`}
                  style={{ width: 800 }}
                  onChange={handleChange}
                >
                  {availableSeat.map((seat) => (
                    <Option value={seat.seatNum} key={seat.seatNum}>
                      {"Office: " +
                        seat.officeLocation +
                        ", Seat Number:" +
                        seat.seatNum}
                    </Option>
                  ))}
                </Select>
              )}
            </Row>
          </Col>
        </Card>
      </Col>
      <Col
        span={4}
        style={{ textAlign: "center", marginTop: "3rem", paddingRight: "5px" }}
      >
        <Button
          onClick={handleFinishClick}
          type="primary"
          htmlType="submit"
          shape="round"
        >
          Finish
        </Button>
      </Col>
    </Row>
  ) : (
    <BookConfirmation
      date={props.date}
      officeAddr={props.officeAddr}
      floor={props.floor}
      officeSeat={officeSeat}
    />
  );
}

export default SeatBooking;
