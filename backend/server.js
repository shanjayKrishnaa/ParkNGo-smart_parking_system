import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import stationRoute from './routes/stationRoute.js'

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

app.use("/auth",authRoute)
app.use("/api",stationRoute)

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})