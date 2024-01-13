import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/User/Home";
import Login from "../Pages/User/Login";
import Signup from "../Pages/User/Signup";
import Profile from "../Pages/User/Profile";
import UserProtect from "./UserProtect";
import UserPublic from "./UserPublic";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={ <UserPublic><Signup /></UserPublic> } />
      <Route
        path="/login"
        element={
          <UserPublic>
            <Login />
          </UserPublic>
        }
      />

      <Route
        path="/profile"
        element={
          <UserProtect>
            <Profile />
          </UserProtect>
        }
      />
    </Routes>
  );
}

export default UserRoutes;
