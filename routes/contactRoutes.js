const express = require("express");
const { getContact, getContacts, createContact, updateContact, deleteContact } = require("../Controller/contactController");
const verifyJWT = require("../Middleware/tokenHandler");
const router = express.Router();


router.use(verifyJWT);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;