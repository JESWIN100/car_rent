import express from 'express';
import {  createWhish, deleteWishlistById, getWhishList, getWishlistById, reomveWhish, userWhislList } from '../../controllers/whishListController.js';
import { authUser } from '../../middlewares/userAuth.js';


const router = express.Router();


router.post('/addWhislist',authUser ,userWhislList);

router.get('/getwishlist/:userId',authUser, getWishlistById);

router.delete("/delteWhish/:userId",authUser,deleteWishlistById)


router.post('/addWhis',authUser ,createWhish);
router.post('/remove',authUser ,reomveWhish);
router.get('/getWhish/:userId',authUser ,getWhishList);

export default router;
