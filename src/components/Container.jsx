import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import HomePage from "./homePage/Home";
import NavFooter from "./navFooter/NavFooter";
import BookDeskPage from "./bookDeskPage/BookDeskPage";
import ProfilePage from "./profilePage/Profile";
import SignUp from "./signUp/SignUp";
import BookingsPage from "./bookingsPage/BookingsPage";
import CheckInPage from "./checkInPage/CheckInPage";
import { AuthProvider } from "../contexts/AuthContext";

function Container() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/bookDesk" element={<BookDeskPage />} />
          <Route exact path="/bookings" element={<BookingsPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/checkin" element={<CheckInPage />} />
        </Routes>
        <NavFooter />
      </AuthProvider>
      <NavFooter />
    </div>
  );
}

export default Container;
