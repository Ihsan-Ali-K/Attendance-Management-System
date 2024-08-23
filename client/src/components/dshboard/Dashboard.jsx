import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import { TiTick } from 'react-icons/ti'
import { FaPercentage, FaUsers } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
const Dashboard = () => {
  const [students, setStudents] = useState({totalStudents: 0, present: 0, absent: 0})

  useEffect(()=>{
    const fetchNumbers = async () =>{
    try {
        const response = await axios.get("http://localhost:8800/api/admin/get-numbers", {withCredentials: true})
      setStudents(response.data)
      }
     catch (error) {
      console.log(error)
    }
  }
    fetchNumbers()
  },[])
console.log(students)

  return (
    <div className='dashboard'>
      <div className="dash-head">
        <h3>Dashboard</h3>
        <p>Welcome to simple attendance management system</p>
        <hr></hr>

      </div>
      <div className='dash-body'>
        <div className="info-card">
        <FaUsers />
          <h2>Total Students</h2>
          <h2>{students && students.totalStudents}</h2>
        </div>
        <div className="info-card">
        <TiTick />
        <h2>Present</h2>
        <h2>{students && students.present}</h2>
        </div>
        <div className="info-card">
        <ImCross />
          <h2>Absent</h2>
          <h2>{students && students.absent}</h2>


        </div>
        <div className="info-card">
        <FaPercentage />
          <h2>Percentange</h2>
          <h2>{students.totalStudents > 0 ? ((students.present / students.totalStudents) * 100).toFixed(2) : 0}%</h2>

        </div>

      </div>


    </div>
  )
}

export default Dashboard