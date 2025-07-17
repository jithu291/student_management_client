import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./components/dashboard";
import AddEditStaff from "./components/dashboard/AddEditStaff";
import AddEditStudent from "./components/dashboard/AddEditStudent";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AdminLoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/staff"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddEditStaff />
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute >
              <AddEditStudent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
