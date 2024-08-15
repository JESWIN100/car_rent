import express from 'express'
import userRoute from './userRoutes.js'
import carRoute from './carRoute.js'

const v1Router=express.Router();

v1Router.use("/user",userRoute)
v1Router.use("/car",carRoute)





export default v1Router