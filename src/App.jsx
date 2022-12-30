import "./App.css";
import React, { useState, useContext, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Signin from "./Pages/Signin";
import Register from "./Pages/Register";
import ForgetPassword from "./Pages/ForgetPassword";
import Otp from "./Pages/Otp";
import NotFound from "./Pages/NotFound";
import NewPassword from "./Pages/NewPassword";
import toast, { Toaster } from "react-hot-toast";
import AllBooks from "./Pages/AllBooks";
import YourBooks from "./Pages/YourBooks";
import Notification from "./Pages/Notification";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import ProtectedRoute from "./Utils/ProtectedRoute";
import ManageBooks from "./Pages/ManageBooks";
import IssueRequest from "./Pages/IssueRequest";
import AllIssueReq from "./Pages/AllIssueReq";
import StudentList from "./Pages/StudentList";
import BooksList from "./Pages/BookList";
import UserDetailsForm from "./Components/UserDetailsForm";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/allbooks"
            element={
              <ProtectedRoute>
                <AllBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/yourbooks"
            element={
              <ProtectedRoute>
                <YourBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            }
          />

          <Route
            path="/managebooks"
            element={
              <ProtectedRoute>
                <ManageBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/issuerequests"
            element={
              <ProtectedRoute>
                <IssueRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allissuerequests"
            element={
              <ProtectedRoute>
                <AllIssueReq />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allstudents"
            element={
              <ProtectedRoute>
                <StudentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all"
            element={
              <ProtectedRoute>
                <BooksList />
              </ProtectedRoute>
            }
          />
        </Route>
        {/*         
        <Route path="/home" element={<Navigate replace to="/" />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route path="/studentdetails" element={<UserDetailsForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
