import express from 'express';
import { createContact, getContacts } from '../../controllers/contactController.js';
import { authUser } from '../../middlewares/userAuth.js';

const router = express.Router();

// POST route to create a contact
router.post('/create',authUser, createContact);

// GET route to fetch all contacts
router.get('/contacts',authUser, getContacts);

export default router;
