const express = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");

const { CartModel } = require("../models/addtocart.model");

const cartRouter = express();



// ---------------- GET ALL CART DATA GET REQUEST ---------------- //
cartRouter.get("/", async (request, response) => {
    const query = request.query;
    const token = request.headers.authorization;
    let decoded = JsonWebTokenError.verify(token, "auth");
    const userID = decoded.userID;

    try {
        const cartdata = await CartModel.find({userID});
        response.send(cartdata);
    } catch (error) {
        response.send({ "Message": "Cannot able to get the cart data", "Error": error.message });
    }
});


// ---------------- DATA ADDED INTO THE CART POST REQUEST ---------------- //
cartRouter.post("/addtocart", async (request, response) => {
    const payload = request.body;
    let exist=await CartModel.findById({_id:payload._id})
    console.log(exist)

    if(exist==null){

    try {
        const cartdata = new CartModel(payload);
        await cartdata.save();
        response.send({ "Message": "Item Successfully Added Into The Cart!" });
    } catch (error) {
        response.send({ "Message": "Cannot able to add the data to cart", "Error": error.message });
    }
}
else{
    await CartModel.findByIdAndUpdate({ _id: payload._id},{quantity:exist.quantity+payload.quantity});
    response.send({ "Message": "Item Successfully Added Into The Cart!" })


}
});


// ---------------- CART DATA DELETE REQUEST ---------------- //
cartRouter.delete("/delete/:id", async (request, response) => {
    const ID = request.params.id;

    try {
        await CartModel.findByIdAndDelete({ _id: ID });
        response.send({ "Message": `Cart Item of id: ${ID} is successfully deleted from cart` });
    } catch (error) {
        response.send({ "Message": "Cannot able to get the cart data", "Error": error.message });
    }
});


// ---------------- CART DATA UPDATE REQUEST ---------------- //
cartRouter.patch("/update/:id", async (request, response) => {
    const ID = request.params.id;
    const payload = request.body;

    try {
        await CartModel.findByIdAndUpdate({ _id: ID }, payload);
        response.send({ "Message": `Cart Item of id: ${ID} is successfully updated from cart` });
    } catch (error) {
        response.send({ "Message": "Cannot able to update the cart data", "Error": error.message });
    }
});



module.exports = { cartRouter };