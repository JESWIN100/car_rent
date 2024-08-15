import { cloudinaryInstance } from "../config/cloudinaryConfig.js";
import { Car } from "../model/carSchema.js"
import { createCarsValidation } from "../validation/carJoiValidation.js";


export const getCarList =async(req,res,next)=>{

    const carList=await Car.find();
    res.json({success:true,message:'car list fetched',data:carList})


}


export const createCars =async(req,res,next)=>{

   
    if(!req.file){
        return res.status(400).json({success:false,message:"Please upload an image"})
      }
          

    
    const {brand,model,year,pricePerDay,capacity,transmission,
        fuelType,mileage,color,registrationNumber,availability
        }=req.body;

       
        
    // Upload an image
     const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path,{folder:"course"})
    .catch((error) => {
         console.log(error);
     });
  
  console.log(uploadResult);
    

         const newCar= new Car({brand,model,year,image:uploadResult.url,pricePerDay,capacity,transmission,
            fuelType,mileage,color,registrationNumber,availability
            })
             await newCar.save()
        // res.json({success:true,message:' image created scuessfully!'})
 res.json({success:true,message:' new car created scuessfully!',data:newCar})
 

}

export const updateCars =async(req,res,next)=>{

   
    const {brand,model,year,images,pricePerDay,capacity,transmission,
        fuelType,mileage,color,registrationNumber,availability
        }=req.body;

        const {id}=req.params;

        const updatedCars=await Car.findByIdAndUpdate(id,{
            brand,model,year,images,pricePerDay,capacity,transmission,
        fuelType,mileage,color,registrationNumber,availability
        },{new:true})

        res.json({success:true,message:'car updated scuessfully!',data:updatedCars})

}