import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import HomePage from "./homePage/Home";
import NavFooter from "./NavFooter/NavFooter";
import DeskPage from "./deskPage/Desk";
import ProfilePage from "./profilePage/Profile";

function Container() {
  return (
    <div>
      <Routes>
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/desk" element={<DeskPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/" element={<Login />} />
      </Routes>
      <NavFooter />
    </div>
  );
}

export default Container;
