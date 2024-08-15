import {User} from '../model/userModel.js'
import bcrypt  from 'bcrypt'
import { generateUserToken } from '../utils/generateToken.js';
import { validateUserLogin, validateUserRegistration } from '../validation/userJoiValidation.js';


export const userCreate=async(req,res,next)=>{


    //validation fro joi
    const {error}=await validateUserRegistration(req.body);
    if (error) {
        return res.status(402).json({ success: false, message: error.details[0].message });
    }

        const {name,email,password,phone}=req.body;
      
        const userExit=await User.findOne({email})
        if(userExit){
            return res.status(400).json({ success: false,message:'user already exist'})
            }

//hasing
        const salt=10
        const hashedPassword=bcrypt.hashSync(password,salt)

const newUser=new User({name,email,password:hashedPassword,phone})
await newUser.save()


//token

const token=generateUserToken(email)

res.cookie('token',token)

            res.json({ success: true, message: "user created successfully" });
    } 


export const userLogin=async(req,res,next)=>{
  

    // Validate user input
    const { error } = validateUserLogin(req.body);
    if (error) {
        return res.status(402).json({ success: false, message: error.details[0].message });
    }
 

        const {email,password}=req.body;
        

        const userExit=await User.findOne({email})
        if(!userExit){
            return res.status(400).json({success: false,message:'user does not exist'})
            }

            const passwordMatch=bcrypt.compareSync(password,userExit.password)
            if(!passwordMatch){
                return res.status(400).json({success: false,message:'password is incorrect'})   
                }

 const token=generateUserToken(email)
 res.cookie('token',token)
  res.json({success:true,message:'user logged in successfully'})


    } 
    
 export const userProfile=async(req,res,next)=>{
  

        const {id}=req.params
        const userData=await User.findById(id).select("-password")

        
      res.json({success:true,message:'user data fetched',data:userData})
    
    
        } 
         

  export const checkUser=async(req,res,next)=>{
  

            const user=req.user;
            if(!user){
                return res.status(401).json({success:false,message:'user not authenticated'})
                }
            
          res.json({success:true,message:'user is authenticated'})
        
        
            } 
        