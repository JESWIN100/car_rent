import express from 'express';
import { createLocation, deleteLocationById, getLocationById, getLocations, updateLocations } from '../../controllers/locationController.js';
import { authUser } from '../../middlewares/userAuth.js';




const router = express.Router();

 


router.post("/create",authUser,createLocation)
router.get("/locDetails",authUser,getLocations)
router.get("/locDetailsById/:id",authUser,getLocationById)
router.put("/update/:id",authUser,updateLocations)
router.delete("/delete/:id",authUser,deleteLocationById)






export default router;