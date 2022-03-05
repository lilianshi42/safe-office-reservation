import React, { useState } from "react";
import BookForm from "./BookForm";
//import fakeDB from "../../utils/fakeDB";
import { Row, Col, Button } from "antd";
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
