import React from 'react'
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import signup_bg_img from "../assets/parking_signup.jpg";
import { Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    username:"",
    email:"",
    password:"",
    mobile:"",
    vehicle_no:""
  })

  const handleChange = (e)=>{
    setformdata({...formdata,[e.target.name]: e.target.value});
  }

  const handleSubmit = async(req, res) =>{

    const { username, email, password, mobile, vehicle_no } = formdata;
    
    if (!username || !email || !password || !mobile || !vehicle_no) {
      alert("Please fill in all the fields.");
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,10}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be 6–10 characters and include at least:\n- One uppercase letter\n- One lowercase letter\n- One number\n- One special character");
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      alert("Mobile number must be 10 digits.");
      return;
    }
    const vehicleRegex = /^[A-Z]{2}-\d{2}-[A-Z]{1,2}-\d{4}$/i;
    if (!vehicleRegex.test(vehicle_no)) {
      alert("Vehicle number format is invalid. Use format like TN-01-AB-1234.");
      return;
    }

    try{
      const res = await axios.post("http://localhost:3000/auth/createUser",{
        username: formdata.username,
        email:formdata.email,
        password:formdata.password,
        mobile:formdata.mobile,
        vehicle_number: formdata.vehicle_no
      })

      const {message, user} = res.data
      if(message == "User already exists"){
        alert("User already exists");
      }
      else if(message == "User created successfully"){
        navigate('/home',{state:{user}})
        console.log("user created successfully");
      }
    }
    catch(err){
      console.error("Error in creating user", err);
    }
  }

  return (
   <> 
   <div className="flex justify-between">
       <div className ="bg-cover h-screen w-1/2" style={{backgroundImage: `url(${signup_bg_img})`}}>
       </div>
   <div className ="flex justify-center items-center h-screen mr-30">
    <div className = "justify-center items-center bg-black backdrop-blur-3xl pt-3 pb-10 rounded-md shadow-2xl px-20">
      <h2 className="text-center font-bold text-2xl mb-3 text-white">Sign Up</h2>
      <div>
        <h3 className='text-white'>UserName</h3>
        <input type= "text" placeholder="Aakash_001" name="username" required value={formdata.username} onChange={handleChange} className="w-80 pt-3 pb-3 pl-2 mt-2 mb-2  bg-white rounded-md focus:outline-none focus:border-transparent hover:scale-105 transition-transform duration-200 hover:border-blue-500" />
      </div>
      <div>
        <h3 className='text-white'>Email</h3>
        <input type= "email" required placeholder="abc@gmail.com" name="email" value={formdata.email} onChange={handleChange} className="w-80 pt-3 pb-3 pl-2 mt-2 mb-2 border-none bg-white focus:outline-none focus:border-transparent rounded-md hover:scale-105 transition-transform duration-200 hover:border-blue-500"/>
      </div>
      <div>
        <h3 className='text-white'>Password</h3>
        <input type= "password" required placeholder="********" name="password" value={formdata.password} onChange={handleChange} className="w-80 pt-3 pb-3 pl-2 mt-2 mb-2 border-none focus:outline-none focus:border-transparent bg-white rounded-md hover:scale-105 transition-transform duration-200 hover:border-blue-500"/>
      </div>
      <div>
        <h3 className='text-white'>Mobile</h3>
        <input type= "text" required placeholder="9876543212" name="mobile" value={formdata.mobile} onChange={handleChange} className="w-80 pt-3 pb-3 pl-2 mt-2 mb-2 border-none focus:outline-none focus:border-transparent bg-white rounded-md hover:scale-105 transition-transform duration-200 hover:border-blue-500"/>
      </div>
      <div>
        <h3 className='text-white'>Vehicle.No</h3>
        <input type= "text" required placeholder="TN-01-AB-1234" name="vehicle_no" value={formdata.vehicle_no} onChange={handleChange} className="w-80 pt-3 pb-3 pl-2 mt-2 mb-2 border-none focus:outline-none focus:border-transparent bg-white rounded-md hover:scale-105 transition-transform duration-200 hover:border-blue-500"/>
      </div>
      <div className="flex justify-center">
        <button onClick={handleSubmit} className="border-1 bg-green-400 text-white rounded-3xl py-2 border-none px-7 mt-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
          Signup
        </button>
      </div>
      <h5 className="text-center mt-4 text-white">Already have an account? <Link to="/login" className="text-blue-400 underline text-lg">Login</Link></h5>
    </div>
   </div>
   </div>
   </>
  )
}

export default Signup