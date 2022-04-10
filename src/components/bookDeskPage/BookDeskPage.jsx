import React from "react";
import BookForm from "./BookForm";

//import fakeDB from "../../utils/fakeDB";
import "./BookDesk.css";

function BookDeskPage() {
  //const floors = fakeDB.getAllFloors();

  return (
    <div className="book-desk-page">
      <BookForm />
    </div>
  );
}

export default BookDeskPage;
