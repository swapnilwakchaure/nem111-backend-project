const mongoose = require("mongoose");



const dressSchema = mongoose.Schema({
    img1: { type: String },
    img2: { type: String },
    img3: { type: String },
    img4: { type: String },
    name: { type: String },
    brand: { type: String } ,
    lowprice: { type: Number },
    highprice: { type: Number },
    rating: { type: Number },
    id: { type: Number }
}, {
    versionKey: false
});



const DressModel = mongoose.model("dres", dressSchema);



module.exports = { DressModel };