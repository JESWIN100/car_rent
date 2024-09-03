import express from 'express'
import userRoute from './userRoutes.js'
import carRoute from './carRoute.js'
import bookingRoute from './bookingRoute.js'
import adminRoute from './adminRoute.js'
import reviewRoute from './reviewRoute.js'
import whislist from './whishllistRoute.js'
import Payment from './paymentRoute.js'
import Location from './locationRoute.js'
import Driver from './driverRoute.js'


const v1Router=express.Router();

v1Router.use("/user",userRoute)
v1Router.use("/car",carRoute)
v1Router.use("/booking",bookingRoute)
v1Router.use("/admin",adminRoute)
v1Router.use("/review",reviewRoute)
v1Router.use("/Whishlist",whislist)
v1Router.use("/payment",Payment)
v1Router.use("/location",Location)
v1Router.use("/driver",Driver)








export default v1Router 