import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import parking_bg_img from "../assets/parking_login.jpg"
import { Link } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    username:"",
    password:""
  });
  const handleChange = (e)=>{
    setformdata({...formdata, [e.target.name]:e.target.value});
  }

  const handleSubmit = async(req,res) =>{
    try{
      const res = await axios.get("http://localhost:3000/auth/getUser",{
        params:{
          username:formdata.username,
          password:formdata.password
        }
      })
      const { message, user } = res.data;

      if(message === "User found") {
        navigate('/home',{ state: { user: userData } });
      }
       else if(message === "Incorrect Password") {
        alert("Invalid password");
      } 
      else{
        alert("User not found");
      }
    }
    catch(err){
      console.log("Error in fetching user",err)
    }
  }
  return (
    <div className="bg-cover h-screen w-full flex justify-center items-center" style={{backgroundImage: `url(${parking_bg_img})`}}>
        <div className="rounded-lg backdrop-blur-lg sm:px-7 lg:px-10 pb-5">
            <h2 className="text-center font-bold text-2xl mt-3 mb-3 text-white">Login</h2>
            <h4 className ="text-white">UserName</h4>
            <input type="text" name="username" placeholder="username" value = {formdata.username} onChange={handleChange}className="w-80 bg-white border-1 rounded-lg focus:outline-none focus:border-transparent pl-3 py-3 mt-2 mb-4"/>
            <h4 className="text-white">Password</h4>
            <input type="password" name="password" placeholder="password" value = {formdata.password} onChange={handleChange}className="w-80 bg-white border-1 rounded-lg focus:outline-none focus:border-transparent pl-3 py-3 mb-4"/>
            <h5 className="flex justify-end mb-3 text-white underline">forget Password?</h5>
            <div className="flex justify-center ">
                <button onClick={handleSubmit} className="px-7 py-2 rounded-3xl bg-blue-500 text-white hover:cursor-pointer hover:scale-105 transition-transform duration-400">
                    Login
                </button>
            </div>
            <h5 className="text-white text-center mt-3">Don't have an account? <Link to="/signup" className="text-blue-400 underline text-lg">SignUp</Link></h5>
        </div> 
    </div>
  )
}

export default Login




