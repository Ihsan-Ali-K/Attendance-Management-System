import React from 'react'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import { IoHome, IoLogOutSharp } from 'react-icons/io5'
import { MdPending } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice'
import { Button } from 'react-bootstrap'



const Navbar = () => {
  const { currentUser } = useSelector(state => state.user)
  console.log(currentUser)
const navigate = useNavigate()
  const handleLogout = async () =>{
    logout()
    navigate("/login")
  }
  return (
   
    <div className='sidebar'>
      <h1>AMS</h1>
      {
        currentUser.role === "student" &&
          <div className="links">
            <Link to="/attendances">
              <IoHome /> Attendances
            </Link>
            <Link to="/leaverequest"><MdPending /> Leave Request</Link>
            <Link to="/profile"><FaUser /> Profile</Link>
            <Link onClick={handleLogout}><IoLogOutSharp /> Logout</Link>
          </div>
          

   

      }
      {currentUser.role === "admin" &&
               <div className="links">
               <Link to="/dashboard">
                 <IoHome /> Dashboard
               </Link>
               <Link to="/students"><MdPending /> Students</Link>
               <Link to="/attendancesheet"><FaUser /> Attendance Sheet</Link>
               <Link onClick={handleLogout}><IoLogOutSharp /> Logout</Link>
             </div>
      }


    </div>
  )
}

export default Navbar