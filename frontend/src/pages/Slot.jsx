import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import SlotButton from '../components/slotButton'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const Slot = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const [selectedSlots, setSelectedSlots] = useState([])
  const [cost, setCost] = useState(0)
  const [time, setTime] = useState(1)
  const state = location.state || {}
  const {id, name, address, amount, veh_no} = state
  const [slots,setSlots] = useState([])
  const timeOptions = [1, 2, 4, 6, 8, 12, 24];

  const params = useParams()

  useEffect(()=>{
    async function stationDetails(){
      try{
        const data = await axios.get(`http://localhost:3000/api/getStationDetails/${id}`)
        setSlots(data.data)
        console.log("Station details fetched successfully")
      }
      catch(err){
        console.log("Error in fetching the station details")
      }
    }
    stationDetails();
  },[])

  const handleClick = (c) =>{
    setTime(c);
  }

  const toggleSlotSelection = (label) => {
    setSelectedSlots((prev) => {
      if (prev.includes(label)) {
        return prev.filter((slot) => slot !== label); 
      } 
      else {
        if(prev.length >= 2){
          alert("You can only select 2 slots at a time");
          return prev;
        }
        return [...prev, label];
      }
  });
}

  useEffect(()=>{
    const tot = Number(time)*Number(amount)*selectedSlots.length
    setCost(tot)
  },[time, selectedSlots])
  
  const handleBook = ()=>{
    navigate('/booking',{state:{time, name, slot: selectedSlots, veh_no }})
  }


  return (
    <>
    <div className="flex flex-col ">
      <div className ="fixed top-0 w-full bg-black flex flex-col justify-center items-center py-5">
          <h1 className="font-bold text-white text-3xl">{name || "No station found"}</h1>
          <h1 className="font-semibold text-white text-xl mt-2"> {address}</h1>
          <div className="flex text-white gap-3 mt-2">
            {timeOptions.map((t) => (
              <button
                key={t}
                className={`px-3 py-2 rounded-md hover:scale-105 cursor-pointer ${
                  time === t ? 'bg-green-500' : 'bg-red-500'
                }`}
                onClick={() => handleClick(t)}
              >
                {t} hour{t > 1 ? 's' : ''}
              </button>
            ))}
          </div>
      </div>
      <div className="flex">
        <div className="mt-[200px] flex justify-center items-center flex-grow pb-20">
          <div className="grid grid-cols-10 gap-x-3 gap-y-3">
            {slots.map((slot)=>(
            <SlotButton
              key={slot.id}
              name={name}
              label={slot.slotLabel}
              available={slot.is_available}
              amount={String(amount)}
              isSelected={selectedSlots.includes(slot.slotLabel)} 
              onToggle={() => toggleSlotSelection(slot.slotLabel)}            
              />
            ))}
          </div>
        </div>
       <div className="fixed top-40 bottom-13 right-0 w-[300px] bg-gray-200 text-black p-4 z-50 overflow-y-auto flex flex-col justify-center items-center">
        <div className="flex gap-2">
          <h1 className="text-xl font-semibold">Selected : </h1>
          <h3 className="text-xl font-semibold">{selectedSlots.length==0 ? "-" : selectedSlots.map((prev,index) => (<span key={prev}>{prev} {index < selectedSlots.length - 1 ? ', ' : ''}</span>))}</h3>
        </div>
        <h1 className="text-xl font-semibold" >Cost : {cost}</h1>
        <button className="px-4 py-3 rounded-md bg-red-400 mt-3 hover:scale-105 cursor-pointer" onClick={handleBook}>Book now</button>
        </div>
      </div>
      <div className="fixed bottom-0 w-full flex items-center justify-center gap-6 bg-gray-100 p-4 text-black text-sm ">
        <div className="flex items-center gap-1"><div className="w-5 h-5 bg-gray-400 rounded-md" />Available</div>
        <div className="flex items-center gap-1"><div className="w-5 h-5 bg-green-400 rounded-md" /> Selected</div>
        <div className="flex items-center gap-1"><div className="w-5 h-5 bg-red-400 rounded-md" /> Booked</div>
      </div>
    </div>
    </>
  )
}

export default Slot