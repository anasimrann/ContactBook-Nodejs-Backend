const Contact = require("../Models/contactModel");
const asyncHandler = require("express-async-handler");


const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    return res.status(200).json(contacts)
})

const createContact = asyncHandler(async (req, res) => {

    const { name, email, Phone } = req.body;
    if (!name || !email || !Phone) {
        res.status(400)
        throw new Error("All Fields Are Mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        Phone,
        user_id: req.user.id
    });

    return res.status(200).json(contact)
})

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne({ _id: req.params.id })
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    return res.status(200).json(contact)
})

const updateContact = asyncHandler(async (req, res) => {
    const findContact = await Contact.findById(req.params.id);
    if (!findContact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You are Un Authorized")
    }

    const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    )
    return res.status(201).json(contact)
})

const deleteContact = asyncHandler(async (req, res) => {
    const findContact = await Contact.findById(req.params.id);
    if (!findContact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if (findContact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You are Un Authorized")
    }

    await findContact.remove();
    return res.status(201).json({ message: `Contact Deleted for ${req.params.id}` });
})


module.exports = { getContact, createContact, getContacts, updateContact, deleteContact }