const mongoose = require("mongoose");
const { Schema } = mongoose;


const contactSchema = Schema({
    name: {
        type: String,
        required: [true, "Please Add the Contact Name"]
    },
    email: {
        type: String,
        required: [true, "Please Add the Contact Email"]
    },
    Phone: {
        type: String,
        required: [true, "Please Add the Contact Phone Number"]
    }
},
    {
        timestamps: true
    });

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;