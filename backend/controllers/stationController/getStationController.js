import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const getStationDetails = async(req, res)=>{
    const {id} = req.params
    try{
        const station = await prisma.parkingSlot.findMany({
            where:{
                parkingStationId: parseInt(id)
            }
        })
        console.log("Station detials fetched successfully")
        return res.status(200).json(station)
    }
    catch(err){
        console.log("Error in fetching the station details",err);
        return res.status(500).send({error:"Error in fetching the stationn details"})
    }
}