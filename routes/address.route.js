const express = require("express");

const { AddressModel } = require("../models/address.model");

const addressRouter = express();



// --------------- USER ADDRESS DETAILS GET REQUEST --------------- //
addressRouter.get("/", async (request, response) => {
    const query = request.query;

    try {
        const address = await AddressModel.find(query);
        response.send(address);
    } catch (error) {
        response.send({ "Message": "Cannot able to get the user's address details" });
    }
});


// --------------- USER ADDRESS DETAILS POST REQUEST --------------- //
addressRouter.post("/details", async (request, response) => {
    const { first_name, last_name, mobile_number, country, address, postcode, userID } = request.body;

    try {
        if ( first_name && last_name && mobile_number && country && address && postcode ) {
            const address = new AddressModel({ first_name, last_name, mobile_number, country, address, postcode, userID });
            await address.save();
            response.send({ "Message": "User Address Successfully Added" });
        } else {
            response.send({ "Message": "All fields are required" });
        }
    } catch (error) {
        response.send({ "Message": "Cannot able to add the user's address details" });
    }
});


// --------------- USER ADDRESS DETAILS DELETE REQUEST --------------- //
addressRouter.delete("/delete/:id", async (request, response) => {
    const ID = request.params.id;

    try {
        await AddressModel.findByIdAndDelete({ _id: ID });
        response.send({ "Message": `User Address of id: ${ID} is successfully deleted` });
    } catch (error) {
        response.send({ "Message": `Cannot able to delete the user's address details of id: ${ID}` });
    }
});


// --------------- USER ADDRESS DETAILS UPDATE REQUEST --------------- //
addressRouter.patch("/update/:id", async (request, response) => {
    const ID = request.params.id;
    const payload = response.body;

    try {
        await AddressModel.findByIdAndUpdate({ _id: ID }, payload);
        response.send({ "Message": `User address of id: ${ID} is successfully updated` });
    } catch (error) {
        response.send({ "Message": "Cannot able to get the user's address details" });
    }
});




module.exports = { addressRouter };