import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from "axios"
import { MdDeleteForever } from 'react-icons/md'
const Students = () => {
  const [students, setStudents] = useState([])

  useEffect(()=>{
      const fetchStudents = async ()  =>{
        try {
          const response = await axios.get("http://localhost:8800/api/admin/users", 
            {withCredentials: true }
          )
          setStudents(response.data)
        } catch (error) {
          console.log(error)
        }
      }
      fetchStudents()
  },[students])
 const handleDelete = async (id) =>{
  
  try {
    const res = await axios.delete(`http://localhost:8800/api/admin/users/${id}`,{
      withCredentials: true
    })

    
  } catch (error) {
    console.log(error)
  }
 }
  return (
    <div><Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Student Name</th>
        <th>Email</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
     {students.map((item, index)=>(

       <tr key={index}>
       <td>{index+1}</td>
       <td>{item.username}</td>
       <td>{item.email}</td>
       <td><MdDeleteForever onClick={()=>handleDelete(item._id)} style={{fontSize: "30px", cursor:"pointer"}}/></td>
     </tr>
     ))}
     
    </tbody>
  </Table></div>
  )
}

export default Students