import axios  from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginSuccess } from '../../redux/userSlice'

const Register = () => {
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state=> state.user) 
 const navigate = useNavigate()
const handleSubmit = async (e) =>{
  e.preventDefault()
  try {
    const res = await  axios.post("http://localhost:8800/api/users/register ", {username, email, password},
      {withCredentials: true }
    )
    dispatch(loginSuccess(res.data))
    navigate("/")
  } catch (error) {
    console.log(error)
  }

}
  return (
    <div className="login" >
      <h1>Please Signup to proceed</h1>
      <Form >

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" onChange={(e)=>setUserName(e.target.value)} value={username} placeholder="Enter your name" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone .
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} value={email}  placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} value={password}  placeholder="Password" />
        </Form.Group>
       
        <div className="button">

        <Button variant="primary" onClick={handleSubmit} type="submit">
          SignUp
        </Button>
        <Link to="/login">
        <Button variant="link" s >
          <span style={{color:"black"}}>login</span>
          <span style={{ display: 'block', fontSize: '0.8em', color: 'white' }}>Already registerd click here</span>
        </Button>
         </Link>
        </div>
      </Form>
    </div>
  )
}

export default Register