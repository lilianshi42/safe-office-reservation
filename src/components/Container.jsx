import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import HomePage from "./homePage/Home";
import NavFooter from "./navFooter/NavFooter";

function Container() {
  return (
    <div>
      <Routes>
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/" element={<Login />} />
      </Routes>
      <NavFooter />
    </div>
  );
}

export default Container;
