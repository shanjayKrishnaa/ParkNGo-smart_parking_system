import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export const getAllStations = async(req, res)=>{
    try{
    const stations = await prisma.parkingStation.findMany();
    if(!stations){
        console.log("No stations found")
        return res.status(404).json({message:"No stations found"})
    }
    console.log(stations)
    return res.status(200).json(stations)
    }
    catch(err){
        console.log("Error in fetching the stations",err)
        return res.status(500).json({error:"error in fetching the stations"})
    }
}