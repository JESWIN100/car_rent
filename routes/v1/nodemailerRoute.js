import express from 'express';
import { Createmessage } from '../../controllers/nodeMailerController.js';



const router = express.Router();

 
router.post("/create",Createmessage)




export default router;