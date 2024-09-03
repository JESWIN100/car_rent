import { Driver } from "../model/driverDetailsSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const createDriver = asyncHandler(async (req, res, next) => {
    const {  firstName, lastName, driverAge, mobileNumber, licenceNumber } = req.body;

    const foundDriver = await Driver.findOne({ licenceNumber });
    if (foundDriver) {
        return res.status(400).json({ success: false, message: "Driver with this license number already exists" });
    }

    const newDriver = new Driver({ firstName, lastName, driverAge, mobileNumber, licenceNumber });
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
