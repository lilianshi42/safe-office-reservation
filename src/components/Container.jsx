import React from "react";
import NavFooter from "./NavFooter/NavFooter";
import Login from "./Login/Login";
import HomePage from "../pages/HomePage/Home";

import { Route, Routes } from "react-router-dom";

function Container() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
      <NavFooter />
    </div>
  );
}

export default Container;
