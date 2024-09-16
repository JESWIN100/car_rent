import { Driver } from "../model/driverDetailsSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const createDriver = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, driverAge, mobileNumber, licenceNumber } = req.body;

    const currentTime = new Date();

    // Find a driver with the same license number
    const foundDriver = await Driver.findOne({ licenceNumber });

    if (foundDriver) {
        // Check if the license number is locked and whether the lock has expired
        if (foundDriver.lockUntil && foundDriver.lockUntil > currentTime) {
            return res.status(400).json({ success: false, message: "Driver is temporarily locked for booking, try again later." });
        }

        // If the driver exists but lock has expired, proceed with booking and reset lock
        foundDriver.lockUntil = new Date(Date.now() + 10 * 1000); // 10 seconds lock
        await foundDriver.save();

        return res.status(400).json({ success: false, message: "Driver with this license number already exists" });
    }

    // Create a new driver and set a temporary lock on the license number
    const newDriver = new Driver({
        firstName,
        lastName,
        driverAge,
        mobileNumber,
        licenceNumber,
        lockUntil: new Date(Date.now() + 10 * 1000) // Lock for 10 seconds
    });

    await newDriver.save();

    res.status(201).json({ success: true, message: "Driver created successfully", data: newDriver });
});


  // Get a driver by their ID or license number
  export const getDriver = asyncHandler(async (req, res, next) => {
    const { id, licenceNumber } = req.params;

    let driver;
    if (id) {
        driver = await Driver.findById(id);
    } else if (licenceNumber) {
        driver = await Driver.findOne({ licenceNumber });
    }

    if (!driver) {
        return res.status(404).json({ success: false, message: "Driver not found" });
    }

    res.status(200).json({ success: true, data: driver });
});
;

// Delete a driver by their ID or license number
export const deleteDriver = asyncHandler(async (req, res, next) => {
    const { id, licenceNumber } = req.params;

    let driver;
    if (id) {
        driver = await Driver.findByIdAndDelete(id);
    } else if (licenceNumber) {
        driver = await Driver.findOneAndDelete({ licenceNumber });
    }

    if (!driver) {
        return res.status(404).json({ success: false, message: "Driver not found" });
    }

    res.status(200).json({ success: true, message: "Driver deleted successfully" });
});



export const getDriverList = asyncHandler(async (req, res, next) => {
    
    const carList = await Driver.find().populate('user')
        res.json({ success: true, message: 'Car list fetched', data: carList });
    })
