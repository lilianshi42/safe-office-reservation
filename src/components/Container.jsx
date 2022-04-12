import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./login/Login";
import HomePage from "./homePage/Home";
import NavFooter from "./navFooter/NavFooter";
import BookDeskPage from "./bookDeskPage/BookDeskPage";
import ProfilePage from "./profilePage/Profile";
import SignUp from "./signUp/SignUp";
import BookingsPage from "./bookingsPage/BookingsPage";
import CheckInPage from "./checkInPage/CheckInPage";
import CheckOutPage from "./checkOutPage/CheckOutPage";
import { useAuth } from "../contexts/AuthContext";
import DeskPage from "./deskPage/DeskPage";
import CheckInConfirmation from "./checkInPage/CheckInConfirmation";
import CheckOutConfirmation from "./checkOutPage/CheckOutConfirmation";
function Container() {
  const { currentUser } = useAuth();

  return (
    <div>
      <Routes>
        <Route exact path="/" element={currentUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route exact path="/bookDesk" element={<BookDeskPage />} />
        <Route exact path="/bookings" element={<BookingsPage />} />
        <Route exact path="/desk" element={<DeskPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/check-in" element={<CheckInPage />} />
        <Route exact path="/check-out" element={<CheckOutPage />} />
        <Route path="/check-in-success" element={<CheckInConfirmation />} />
        <Route path="/check-out-success" element={<CheckOutConfirmation />} />
      </Routes>
      {currentUser ? <NavFooter /> : ""}
    </div>
  );
}

export default Container;
