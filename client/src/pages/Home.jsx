import React, { useState } from 'react'
import Login from '../components/authentication/Login';
import Register from '../components/authentication/Register';
import Navbar from '../components/navbar/Navbar';
import Header from '../components/header/Header';
import Attendances from '../components/attendances/Attendances';
import LeaveRequest from '../components/leaverrequest/LeaveRequest';
import Profile from '../components/profile/Profile';
import {login } from "../redux/authSlice.js"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
  useNavigate
} from "react-router-dom";
import Dashboard from '../components/dshboard/Dashboard';
import AttendanceSheet from '../components/attendancesheet/AttendanceSheet';
import Students from '../components/Students/Students';
import { useDispatch, useSelector } from 'react-redux';


const Layout = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  
  return (

    <>
   
        <div style={{ display: "flex" }}>
          <Navbar />
          <div style={{ width: "100%" }}>
            <Header />
            <Outlet />
          </div>
        </div>
      
     
    </>

  )
}

const ProtectedRoute = ({ element }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  
  return currentUser ? element : <Navigate to="/login" />;
};
const Home = () => {

 

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute element={<Layout />} />,
      children: [
        {
          path: "/attendances",
          element: <Attendances />
        },
        {
          path: "/leaverequest",
          element: <LeaveRequest />
        },
        {
          path: "/profile",
          element: <Profile />
        },
        {
          path: "/dashboard",
          element: <Dashboard />
        },
        {
          path: "/attendancesheet",
          element: <AttendanceSheet />
        },
        {
          path: "/students",
          element: <Students />
        },
      ],

    },
    {
      path: "/login",
      element: <Login  />
    },
    {
      path: "/register",
      element: <Register />
    },
  ]

  );

  return (
    <div>
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  )
}

export default Home