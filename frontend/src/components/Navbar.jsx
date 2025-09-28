import { useState } from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {


  return (
    <div>
        <div className="flex justify-between pt-5 pb-5 bg-slate-50">
            <h1 className="ml-10 font-bold text-2xl">Park N Go</h1>
            <nav>
                <ul className="flex space-x-5 mr-10">
                    <li className="hover:underline cursor-pointer"><Link to="/home">Home</Link></li>
                    <li className="hover:underline cursor-pointer"><Link>Station</Link></li>
                    <li className="hover:underline cursor-pointer"><Link to="/booking">Booking</Link></li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Navbar