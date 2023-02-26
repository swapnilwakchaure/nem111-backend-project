const express = require("express");

const { PaymentModel } = require("../models/paymentDetail.model");

const paymentRouter = express();



// --------------- USER PAYMENT DETAILS GET REQUEST --------------- //
paymentRouter.get("/", async (request, response) => {
    const query = request.query;

    try {
        const details = await PaymentModel.find(query);
        response.send(details);
    } catch (error) {
        response.send({ "Message": "Cannot able to get the user's payment details" });
    }
});

// --------------- USER PAYMENT DETAILS POST REQUEST --------------- //
paymentRouter.post("/paymentdetails", async (request, response) => {
    const { name_on_card, card_number, month, year, security_code, userID } = request.body;

    try {
        if ( name_on_card && card_number && month && year && security_code ) {
            const details = new PaymentModel({ name_on_card, card_number, month, year, security_code, userID });
            await details.save();
            response.send({ "Message": `User ${userID} is successfully added payment details` });
        } else {
            response.send({ "Message": `User ${userID} is cannot not able to add payment details` })
        }
        } catch (error) {
        response.send({ "Message": "Cannot able to update the user's payment details" });
    }
});

// --------------- USER PAYMENT DETAILS DELETE REQUEST --------------- //
paymentRouter.delete("/delete/:id", async (request, response) => {
    const ID = request.params.id;

    try {
        await PaymentModel.findByIdAndDelete({ _id: ID });
        response.send({ "Message": `User of id ${ID} is successfully deleted payment data` });
    } catch (error) {
        response.send({ "Message": "Cannot able to delete the user's payment details" });
    }
});

// --------------- USER PAYMENT DETAILS UPDATE PATCH REQUEST --------------- //
paymentRouter.patch("/update/:id", async (request, response) => {
    const ID = request.params.id;
    const payload = request.body;

    try {
        await PaymentModel.findByIdAndUpdate({ _id: ID }, payload);
        response.send({ "Message": `User of id: ${ID} is successfully updated payment data` });
    } catch (error) {
        response.send({ "Message": "Cannot able to update the user's payment details" });
    }
});




module.exports = { paymentRouter };