import { cloudinaryInstance } from "../config/cloudinaryConfig.js";
import { Car } from "../model/carSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createCarsValidation } from "../validation/carJoiValidation.js";

export const getCarList = asyncHandler(async (req, res, next) => {
    
        const carList = await Car.find();
        res.json({ success: true, message: 'Car list fetched', data: carList });
    })

export const getCarListById = asyncHandler(async (req, res, next) => {
   
        const { id } = req.params;
        const car = await Car.findById(id);
        
        if (!car) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }
        
        res.json({ success: true, message: 'Car fetched successfully', data: car });
    })

export const createCar = asyncHandler(async (req, res, next) => {
   
        // Validate request body
        const { error } = createCarsValidation(req.body);
        if (error) return res.status(400).json({ success: false, message: error.details[0].message });

        const { brand, model, year, pricePerDay, capacity, transmission, fuelType, mileage, color, registrationNumber, availability } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Please upload an image" });
        }
        
        const existingCar = await Car.findOne({ model: model });
        if (existingCar) {
            return res.status(400).json({ success: false, message: "Car already exists" });
        }
        
        // Upload an image
        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path, { folder: "car" });

        const newCar = new Car({ brand, model, year, pricePerDay, capacity, transmission, fuelType, mileage, color, registrationNumber, availability });
        if (uploadResult?.url) {
            newCar.image = uploadResult.url;
        }
        
        await newCar.save();
        res.json({ success: true, message: 'New car created successfully!', data: newCar });
    } )

export const updateCar = asyncHandler(async (req, res, next) => {
    
        const { brand, model, year, pricePerDay, capacity, transmission, fuelType, mileage, color, registrationNumber, availability } = req.body;
        const { id } = req.params;

        const updatedCar = await Car.findByIdAndUpdate(id, {
            brand, model, year, pricePerDay, capacity, transmission, fuelType, mileage, color, registrationNumber, availability
        }, { new: true });

        res.json({ success: true, message: 'Car updated successfully!', data: updatedCar });
    } )

export const deleteCar = asyncHandler(async (req, res, next) => {
   
        const { id } = req.params;
        const deletedCar = await Car.findByIdAndDelete(id);

        if (!deletedCar) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }

        res.json({ success: true, message: 'Car deleted successfully!', data: deletedCar });
    } )

export const search = asyncHandler(async (req, res) => {
   
      const { model } = req.query; // Extracting the car name from query parameters
  

      if (!model) {
        return res.status(400).json({ success: false, message: 'Model query parameter is required' });
      }
      // Search for cars that match the provided name
      const getcars = await Car.find({ model: model });
  
      if (getcars.length === 0) {
        return res.status(404).json({ success: false, message: 'No cars found' });
      }
  
      // Return the matching cars
      res.json({ success: true, message: 'Cars found successfully', data: getcars });
    } )
   