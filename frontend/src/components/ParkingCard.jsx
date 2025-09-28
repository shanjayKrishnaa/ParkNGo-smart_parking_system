import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ParkingCard = ({id, name, address, amount, username, veh_no}) => {
    const navigate = useNavigate();
    const [like, setLike] = useState(false)
    const handleLike = ()=>{
        if(like==true){
            setLike(false)
        }
        else{
            setLike(true)
        }
    }
    const handleSubmit = ()=>{
        navigate('/slot', {state:{id, name, address, amount, veh_no}})
    }

  return (
        <div className="w-100  bg-black rounded-md shadow-lg flex flex-col h-full py-4 pl-4 pr-3">
            <div className="w-full ">
                <div className="text-white">
                    <h2 className="mt-1 font-semibold text-2xl">{name}</h2>
                    <h4 className="mt-1 text-sm">{address}</h4>
                    <div className="flex justify-between mr-4 mt-3">
                        <div className="flex gap-3">
                            <h1 className="text-xl mt-2">₹{amount}/hr</h1>
                            <button className="text-2xl hover:cursor-pointer" onClick={handleLike}> {like ?<FaHeart className="text-red-500"/> : <FaRegHeart />}</button>
                        </div>
                        <button className="bg-blue-500 p-2 rounded-md mt-2 hover:bg-blue-700 transition-tranform duration-200 hover:cursor-pointer"  onClick={handleSubmit}>Book Now</button>
                    </div>
                </div>  
            </div>
        </div>
  )
}

export default ParkingCard