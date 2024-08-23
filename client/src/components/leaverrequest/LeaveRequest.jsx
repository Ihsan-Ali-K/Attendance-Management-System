import React, { useEffect, useState } from 'react'
import { Button, Dropdown, DropdownButton, FloatingLabel, Form } from 'react-bootstrap'
import "./LeaveRequest.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useSelector } from 'react-redux';

const LeaveRequest = () => {
  const {currentUser} = useSelector((state)=>state.user)
  const userId = currentUser._id;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reason, setReason] = useState("")
  const [response, setResponse] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState("")
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false) // State to disable the button

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8800/api/leave/leavereq", {
      userId, startDate, endDate, reason
    },
  {
    withCredentials : true
  }
  )
  
  setResponse(res.data)

  }
  useEffect(()=>{
    const getStatus = async () =>{
    const response =await axios.get(`http://localhost:8800/api/leave/leavereq/${userId}`, {
      withCredentials: true
    });
     setIsSubmitted(response.data)
     console.log("jeee")
     console.log(isSubmitted)
      // Check if the last submission was within the past 24 hours
      if (response.data.length > 0) {
        const lastSubmission = new Date(response.data[0].createdAt);
      

        const now = new Date();
        const timeDifference = now - lastSubmission;
        const hoursDifference = timeDifference / (1000 * 60 * 60);

        if (hoursDifference < 10) {
          setIsSubmitDisabled(true);
        } else {
          setIsSubmitDisabled(false);
        }
        console.log(isSubmitDisabled)
      }
    }
    getStatus()
  },[userId])
  return (
    <div className='leaverequest'>
      <h3>You may or may not be granted to leave</h3>
      <FloatingLabel controlId="floatingTextarea2" label="Write your reason for Leave Request">
        <Form.Control
          as="textarea"
          onChange={(e) => setReason(e.target.value)}
          value={reason}
          placeholder="Leave a comment here"
          style={{ height: '300px', width: "100%" }}
        />
      </FloatingLabel>

      <div className="datepicker">
        <label>Start Date</label>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <label>Ende Date</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />


      </div>
      <Button variant="secondary"  onClick={handleSubmit} size="lg" disabled={isSubmitDisabled}>
        Submit your reason
      </Button>
      {isSubmitDisabled && <p>Please wait: You have already submitted your leave Request.</p>}
      <div className="status">
        <label>Status:  </label> {isSubmitted && isSubmitted[0].status}
      </div>
    </div>
  )
}

export default LeaveRequest