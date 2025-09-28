import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export const deleteAllStations = async (req, res)=>{
    try{
        const del1 = await prisma.parkingStation.deleteMany()
        const del2 = await prisma.parkingSlot.deleteMany()
        if(del1 && del2){
            console.log("All stations and slots deleted succesfully")
            return res.status(200).send({message:"All stations and slots deleted successfully"})
        }
    }
    catch(err){
        console.log("Error in deleting all the station and slots",err)
        return res.status(500).send({error:"Error is deleting the stations and slots"})
    }
}