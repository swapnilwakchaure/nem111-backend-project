const mongoose = require("mongoose");



const paymentDetailSchema = mongoose.Schema({
    name_on_card: { type: String },
    card_number: { type: String },
    month: { type: Number },
    year: { type: Number },
    security_code: { type: Number },
    userID: { type: Number }
}, {
    versionKey: false
});



const PaymentModel = mongoose.model("paymentdetail", paymentDetailSchema);



module.exports = { PaymentModel };