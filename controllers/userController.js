import {User} from '../model/userModel.js'
import bcrypt  from 'bcrypt'
import { generateUserToken } from '../utils/generateToken.js';
import { validateUserLogin, validateUserRegistration } from '../validation/userJoiValidation.js';
import { asyncHandler } from '../utils/asyncHandler.js';


export const userCreate=asyncHandler(async(req,res,next)=>{


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
    } )


export const userLogin=asyncHandler(async(req,res,next)=>{
  

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
 const cookieOptions = {
    sameSite: 'None',
    secure: true,
    httpOnly: true,
};
 res.cookie('token',token,cookieOptions)
  res.json({success:true,message:'user logged in successfully'})


    } )
     
 export const userProfile=asyncHandler(async(req,res,next)=>{
  

        const user=req.user
        const userData=await User.findOne({email:user.email}).select("-password")

        
      res.json({success:true,message:'user data fetched',data:userData})
    
    
        } )
         
  export const checkUser=asyncHandler(async(req,res,next)=>{
  

            const user=req.user;
            if(!user){
                return res.status(401).json({success:false,message:'user not authenticated'})
                }
            
          res.json({success:true,message:'user is authenticated'})
        
        
            } )

export const userLogout=asyncHandler(async(req,res,next)=>{

                res.clearCookie("token")
                 res.json({success:true,message:'user logged out successfully'})
                 
            
                } )