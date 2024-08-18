import express from 'express';
import {  deleteWishlistById, getWishlistById, userWhislList } from '../../controllers/whishListController.js';
import { authUser } from '../../middlewares/userAuth.js';


const router = express.Router();


router.post('/addWhislist',authUser ,userWhislList);

router.get('/getwishlist/:userId',authUser, getWishlistById);

router.delete("/delteWhish/:userId",authUser,deleteWishlistById)

export default router;
