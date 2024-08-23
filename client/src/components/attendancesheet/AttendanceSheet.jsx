import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import "./Attendance.css"
import axios from 'axios'
const AttendanceSheet = () => {
   const [userAttendances, setUserAttendances] = useState([])
   const [loading, setLoading] = useState(true);

   useEffect(()=>{
     const fetchData = async () =>{
      const response = await axios.get("http://localhost:8800/api/admin/usersattendance",{
        withCredentials: true
      })
      setUserAttendances(response.data)
      setLoading(false)
     }
     fetchData()
   },[])
   console.log(userAttendances)
   if (loading) {
    return <p>Loading...</p>;
  }

     // Collect all unique dates across all users
  const allDates = [];
  if(userAttendances && userAttendances.length > 0){
    userAttendances.forEach(user => {
      user.attendances.forEach(attendance => {
        const dateString = new Date(attendance.date).toLocaleDateString();
        if (!allDates.includes(dateString)) {
          allDates.push(dateString);
        }
      });
    })
  }
  return (
    <div className="attendance-sheet">

    <div className='sheet'>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
        
            <th>Name</th>
            {allDates.map((date, index) => (
            <th key={index}>{date}</th>
          ))}
       
          
        
            
          </tr>
         
            {userAttendances.map((user, index)=>(
            <React.Fragment key={index}>
               <tr>
            <td>{user.username}</td>
            {allDates.map((date, index) => (
              <td key={index}>
                {user.attendances.find(attendance =>
                  new Date(attendance.date).toLocaleDateString() === date
                ) ? 'p' : 'a'}
              </td>
            )
          )}
          </tr>
          </React.Fragment>

            ))}
           
      
        </thead>

      </Table>
    </div>
    </div>

  )
}

export default AttendanceSheet