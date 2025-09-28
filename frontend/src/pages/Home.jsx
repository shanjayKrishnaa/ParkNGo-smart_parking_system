import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import {Search} from 'lucide-react'
import ParkingCard from '../components/ParkingCard';

const Home = () => {

    const [search, setsearch] = useState("");
    const [stations, setstations] = useState([]);
    const location = useLocation();
    const { user } = location.state || {};

    const handleSearch = (e)=>{
      setsearch(e.target.value);
    }

    useEffect(()=>{
      async function fetchStations(){
      try{
        const data = await axios.get("http://localhost:3000/api/getAllStations")
        if(!data.data){
          console.log("No stations found")
        }
        setstations(data.data)
      }
      catch(err){
        console.log("Error in fetching the stations")
      }
    }
    fetchStations();
    },[])

  return (
    <div>
      <div className="flex-col bg-slate-900 pb-10 ">
          <Navbar />
          <h1 className="mt-3 font-bold sm:text-3xl lg:text-4xl text-center text-white">SMARTEST WAY TO PARK YOUR VEHICLE</h1>
          <h1 className="text-center mt-2 sm:text-xl lg:text-2xl text-white">View and Book parking spaces at various stations.</h1>
          <div className="flex justify-center mt-8">
            <div className="relative">
              <input type="text" placeholder="search.." value={search} onChange={handleSearch} className="bg-slate-100 focus:outline-none pl-2 pt-2 pb-2 rounded-md sm:w-60 lg:w-80" />
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 p-2 rounded text-white hover:bg-blue-600 hover:cursor-pointer transition"><Search className=""/></button>
            </div> 
          </div>
      </div>
      <div className="ml-15 mt-5 mb-5">
        <h1 className="sm:font-bold lg:font-semibold text-3xl "> All Stations</h1>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5 gap-y-10 mb-5">
        {stations.map((station, index)=>(
          <ParkingCard 
          key={index}
          id={station.id}
          name={station.name}
          address = {station.address}
          amount ={station.amount}
          username={user?.username}
          veh_no={user?.vehicle_number}
          />
        ))
      }
      </div>
    </div>
  )
}

export default Home