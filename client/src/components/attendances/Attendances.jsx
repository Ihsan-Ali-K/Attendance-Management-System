import React, { useEffect, useState } from 'react'
import { Button, Dropdown, DropdownButton, Form, InputGroup, Table } from 'react-bootstrap'
import "./Attendances.css"
import axios from 'axios'
import { useSelector } from 'react-redux'
const Attendances = () => {
  const [status, setStatus] = useState("present")

  const [refresh, setRefresh] = useState(false)
  const [report, setReport] = useState([])
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false) // State to disable the button

  const handleSelect = (eventKey) => {
    setStatus(eventKey)
  }
  const { currentUser } = useSelector(state => state.user)
  let userId = currentUser._id;
  console.log(userId)
  useEffect(() => {
    const fetchReport = async () => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 7);
      const response = await axios.get(`http://localhost:8800/api/attendance/${userId}`,

        {
          params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
          },
          withCredentials: true
        })


      setReport(response.data)
      console.log(report)
       // Check if the last submission was within the past 24 hours
       if (response.data.length > 0) {
        const lastSubmission = new Date(response.data[response.data.length - 1].createdAt);
      

        const now = new Date();
        const timeDifference = now - lastSubmission;
        const hoursDifference = timeDifference / (1000 * 60 * 60);

        if (hoursDifference < 10) {
          setIsSubmitDisabled(true);
        } else {
          setIsSubmitDisabled(false);
        }
      }
    
    }
    fetchReport()
  }, [refresh, userId])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  //handle submit attendance
  const submitAttendance = async (e) =>{
    e.preventDefault()
    try {
      const res = await axios.post(`http://localhost:8800/api/attendance/create`, {
        userId,
        status
        
      },{
        withCredentials: true
      })
      setRefresh(!refresh)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='attendances'>
      <h3>{currentUser.username} Record</h3>
      <Table striped bordered hover variant='secondary' >
        <thead>
          <tr>

            <th>Date</th>
            <th>Present</th>
            <th>Absent</th>


          </tr>
        </thead>
        <tbody>
          {
            report.map((item, index) => (
              <tr key={index}>
                <td>{formatDate(item.createdAt)}</td>
                <td> {item.status==="present" ? item.status : "X" }    </td>
                <td> 
                {item.status==="absent" ? item.status : "X"}     
                </td>
              </tr>
            )
            )
          }


        </tbody>
      </Table>
      <div className="submit">
        <h3>Submit your attendance today</h3>
        <DropdownButton
          onSelect={handleSelect}
          key=""
          id={`dropdown-variants-secondary`}
          variant='info'
          title={status}
        >
          <Dropdown.Item eventKey="present" >Present</Dropdown.Item>
          <Dropdown.Item eventKey="absent"  >Absent</Dropdown.Item>

        </DropdownButton>
        <Button variant="secondary" onClick={submitAttendance} disabled={isSubmitDisabled}>
          Submit attendance
        </Button>{' '}
        {isSubmitDisabled && <p>You have already submitted your attendance within the last 10 hours.</p>}
      </div>
    </div>
  )
}

export default Attendances