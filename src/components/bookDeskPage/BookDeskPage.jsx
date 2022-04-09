import React, { useState } from "react";
import BookForm from "./BookForm";
import Booking from "../../models/booking";
//import fakeDB from "../../utils/fakeDB";
import "./BookDesk.css";

function BookDeskPage() {
  //const floors = fakeDB.getAllFloors();
  const booking = new Booking();

  return (
    <div className="book-desk-page">
      <BookForm booking={booking} />
    </div>
  );
}

export default BookDeskPage;
