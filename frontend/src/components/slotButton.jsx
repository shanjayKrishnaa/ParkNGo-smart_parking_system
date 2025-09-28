import React from 'react'
import { useState } from 'react'

const SlotButton = ({name,label,available,amount,isSelected,onToggle}) => {


  const [isavailable, setIsavailable] = useState(available)
  const bgcolor = !isavailable ? "bg-red-500" : isSelected ? "bg-green-500" :"bg-gray-400"
  const bordercolor = isavailable ? "border-green-500" : "border-red-500"

  const handleClick = () =>{
    onToggle()
  }

  return (
    <>
    <button className="hover:cursor-pointer " onClick={handleClick}>
      <div className={`w-15 h-15 border-3 rounded-md shadow-xl flex justify-center items-center ${bgcolor} ${bordercolor}`}>
        <h1 className="text-white">{label}</h1>
      </div>
    </button>
    </>
  )
}

export default SlotButton