import { Location } from "../model/locationSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { locationSchema } from "../validation/locationJoiValidation.js";

export const createLocation = asyncHandler(async (req, res) => {

    const { error } = locationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    
    const { name, address, city, state, postalCode, country } = req.body;

    // Check if location already exists
    const locationExists = await Location.findOne({ name, address, city, state, postalCode, country });
    if (locationExists) {
        return res.status(400).json({ message: "Location already exists" });
    }

    // Create a new location
    const newLocation = new Location({ name, address, city, state, postalCode, country });
   
        await newLocation.save();
        res.status(201).json({ success: true, message: 'Location created successfully', data: newLocation });
    });

  export const getLocationById = asyncHandler( async (req, res, next) => {
   
        const { id } = req.params;
        const location = await Location.findById(id)
        
        if (!location) {
            return res.status(404).json({ success: false, message: 'Location not found' });
        }
        
        res.json({ success: true, message: 'Location details successfully getted', data: location });
    })

 export const getLocations = asyncHandler(async (req, res, next) => {
  
        const bookings = await Location.find()
           
        res.status(200).json({
            success: true,
            message: 'Location  list fetched successfully',
            data: bookings
        });
    });

export const updateLocations =asyncHandler(async(req,res,next)=>{

        const { name, address, city, state, postalCode, country } = req.body;
        const { id } = req.params;
    
       
        const updateLocations = await Location.findByIdAndUpdate(
            id,
            { name, address, city, state, postalCode, country },
            { new: true }  
        );
    
       
        if (!updateLocations) {
            return res.status(404).json({ success: false, message: 'Location not found' });
        }
    
        res.json({ success: true, message: 'Location updated successfully!', data: updateLocations });
    })
    
 export const deleteLocationById = asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const deleteLocationById = await Location.findByIdAndDelete(id);
        
        if (!deleteLocationById) {
            return res.status(404).json({ success: false, message: 'Location not found' });
        }
        
        res.json({ success: true, message: 'Location deleted successfully!', data: deleteLocationById });
     })