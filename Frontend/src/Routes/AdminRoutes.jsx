import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Admin/Login";
import Home from "../Pages/Admin/Home";
import AddUserPage from "../Pages/Admin/AddUserPage";
import EditUserPage from "../Pages/Admin/EditUserPage";
import AdminProtect from "./AdminProtect";
import AdminPublic from "./AdminPublic";

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <AdminPublic>
              <Login />
            </AdminPublic>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AdminProtect>
              <Home />
            </AdminProtect>
          }
        />
        <Route
          path="/addUser"
          element={
            <AdminProtect>
              <AddUserPage />
            </AdminProtect>
          }
        />
        <Route
          path="/editUser/:id"
          element={
            <AdminProtect>
              <EditUserPage />
            </AdminProtect>
          }
        />
      </Routes>
    </div>
  );
}

export default AdminRoutes;
