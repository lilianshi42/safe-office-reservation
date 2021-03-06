import { useEffect, useState } from "react";

import { Table, Pagination } from "react-bootstrap";

import { BsCheck2Square } from "react-icons/bs";

import { useBookings } from "../../contexts/BookingsContext";
import { useAuth } from "../../contexts/AuthContext";

import "./BookingsPage.css";

//bookings component to show all the bookings history
function BookingsPage() {
  const { getBookingByUsernameAndDate } = useBookings();
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const func = async () => {
      try {
        setBookings(await getBookingByUsernameAndDate(currentUser.email));
      } catch (err) {
        console.log(err);
      }
    };
    func();
  }, [currentUser]);

  let active = 1;
  let items = [];
  //set pagination to 5 rows one page
  for (let number = 1; number <= bookings.length / 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="bookings-page">
      <h2>My Bookings</h2>

      <Table striped bordered hover variant="blue" className="booking-list">
        <thead>
          <tr>
            <th>Date</th>
            <th>FloorId</th>
            <th>Desk #</th>
            <th>CheckedIn</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0
            ? null
            : bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.floorId}</td>
                  <td>{booking.deskId}</td>
                  <td>{booking.checkIn ? <BsCheck2Square /> : null}</td>
                </tr>
              ))}
        </tbody>
      </Table>
      <div className="paging">
        <Pagination>{items}</Pagination>
      </div>
    </div>
  );
}

export default BookingsPage;
