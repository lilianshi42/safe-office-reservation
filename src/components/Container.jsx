import React from "react";
import NavFooter from "./NavFooter/NavFooter";
import Login from "./Login/Login";
import HomePage from "../pages/HomePage/Home";

function Container() {
  return (
    <div>
      {/* <Login /> */}
      <HomePage />
      <NavFooter />
    </div>
  );
}

export default Container;
