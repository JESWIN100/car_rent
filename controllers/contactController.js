// contactController.js
import { Contact } from "../model/contactModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create Contact
export const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone, message, userId } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const existingContact = await Contact.findOne({ email:email });
    if (existingContact) {
        // Handle duplicate case, e.g., send an error response
        return res.status(400).json({ status: false, error: 'Email already exists' });
    }
    


    const newContact = new Contact({name, email, phone,message,userId,});

    await newContact.save();

    res.status(201).json({success: true,message: "Your message has been received. Have a nice day!",data: newContact,});
});

// Get all contacts
export const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find().populate('userId');

    if (!contacts || contacts.length === 0) {
        return res.status(404).json({ success: false, message: "No contacts found" });
    }

    res.status(200).json({
        success: true,
        data: contacts,
    });
});
