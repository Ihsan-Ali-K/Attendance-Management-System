import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import "./Style.css"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../redux/authSlice'
const Login = () => {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")
 const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    dispatch(loginStart())
    try {
      const res = await axios.post("http://localhost:8800/api/users/login ", { username, password }, {
        withCredentials: true
      })
      dispatch(loginSuccess(res.data))
    if(res.data){
      console.log(res.data)
      if(res.data.role=== "admin"){

        navigate("/dashboard")
      }
      else{
        navigate("/attendances")

      }
    }
    } catch (error) {
      dispatch(loginFailure())
      console.error("Login failed: ", error)
      alert("Login failed. Please check your credentials and try again.")

    }

  }
  return (
    <div className="login" >
      <h1>Please Login to proceed</h1>
      <Form >
        <Form.Group className="mb-3">
          <Form.Label>Role </Form.Label>
          <Form.Select onChange={(e) => setRole(e.target.value)} >
            <option>Student</option>
            <option>Admin</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Enter your name" />
          <Form.Text className="text-muted">
            We'll never share your data with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </Form.Group>

      <div className="button">
      <Button variant="primary"  onClick={handleSubmit} type="submit">
          LogIn
        </Button>
         <Link to="/register">
        <Button variant="link" to="/register" >
          <span style={{color:"black"}}>Signup</span>
          <span style={{ display: 'block', fontSize: '0.8em', color: 'white' }}>Click here to register</span>
        </Button>
         </Link>
      </div>
      </Form>
    </div>
  )
}

export default Login