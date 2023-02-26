const mongoose = require("mongoose");



const addressSchema = mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    mobile_number: { type: Number },
    country: { type: String },
    address: { type: String },
    city: { type: String },
    postcode : { type: Number },
    userID: { type: Number }
}, {
    versionKey: false
});



const AddressModel = mongoose.model("address", addressSchema);



module.exports = { AddressModel };