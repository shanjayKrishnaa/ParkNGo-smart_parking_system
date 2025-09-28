import express from 'express'

import {createStation} from '../controllers/stationController/createStationController.js'
import {getAllStations} from '../controllers/stationController/getAllStationController.js'
import {getStationDetails} from '../controllers/stationController/getStationController.js'
import {deleteAllStations} from '../controllers/stationController/deleteStationController.js'

const router = express.Router()

router.post('/createStation',createStation)
router.get('/getAllStations',getAllStations)
router.get('/getStationDetails/:id',getStationDetails)
router.delete('/deleteAllStations',deleteAllStations)

export default router