import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

export const ApplicationViews = () => {
//   const localUser = localStorage.getItem("userProfile")
//   const userObject = JSON.parse(localUser)

    return(
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
}
