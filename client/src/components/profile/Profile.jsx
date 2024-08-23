import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Image } from 'react-bootstrap'
import { FaFacebook, FaInstagramSquare, FaTwitter, FaYoutube } from 'react-icons/fa'
const Profile = () => {
  
  const [data, setData] = useState(null)
  const {currentUser} = useSelector(state=>state.user)
  useEffect(()=>{
      const fetchData = async () =>{
        const response = await axios.get(`http://localhost:8800/api/users/profile/${currentUser._id}`, {
          withCredentials: true
        })
        setData(response.data)
        console.log(data)
      }
      fetchData()
  },[])

  return (
    <div className='profile'>
      <div className="sidebar">
     <div className="image">
     <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdQLwDqDwd2JfzifvfBTFT8I7iKFFevcedYg&s" roundedCircle />
     </div>
      </div>
      <div className="information">
       

      <div className="about">
      <h2>Information</h2>
        <h3>Full Name: {data && data.username}</h3>
        <h3>Email: {data && data.email}</h3>

      </div>
      <div className="sociallinks">
      <FaInstagramSquare className="icon-large"/>
      <FaTwitter className="icon-large"/>
      <FaYoutube className="icon-large"/>
      <FaFacebook className="icon-large"/>
      </div>
      </div>
      </div>
  )
}

export default Profile