import fakeDB from "../../utils/fakeDB";

import "./BookDesk.css";

const BookDeskPage = ()=>{

    const floors = fakeDB.getAllFloors();

    return (
      <div className="book-desk-page">
        <h2>BOOK NEW SEAT</h2>
        
      </div>
    );

}

export default BookDeskPage;