import fakeDB from "../../utils/fakeDB";


import { useEffect,useState } from "react";

import "./BookingsPage.css";

const BookingsPage=()=>{

    const [bookings,setBookings] = useState([]);

    useEffect(()=>{
        setBookings(fakeDB.getBookingByUsernameAndDate("Tom"));
    },[])


    return(
        <div className="bookings-page">
            <h2>My Bookings</h2>
            <table className="booking-list">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>FloorId</th>
                        <th>Desk #</th>
                    </tr>

                </thead>
                <tbody>
                    {
                    bookings.length===0?
                    null:
                    (bookings.map(booking=><tr key={booking.id}>
                        <td>{booking.bookingDate}</td>
                        <td>{booking.floorId}</td>
                        <td>{booking.deskId}</td>
                    </tr>))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default BookingsPage;