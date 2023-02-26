const mongoose = require("mongoose");



const addtocartSchema = mongoose.Schema({
    _id: { type: String },
    img1: { type: String },
    img2: { type: String },
    img3: { type: String },
    img4: { type: String },
    name: { type: String },
    brand: { type: String },
    lowprice: { type: Number },
    highprice: { type: Number },
    rating: { type: Number },
    id: { type: Number },
    quantity: { type: Number },
    userID: { type: String }
}, {
    versionKey: false
});



const CartModel = mongoose.model("cart", addtocartSchema);



module.exports = { CartModel };