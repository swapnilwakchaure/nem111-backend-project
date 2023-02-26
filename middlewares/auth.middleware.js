const jwt = require("jsonwebtoken");


const authenticate = (request, response, next) => {
    const token = request.headers.authorization;

    if (token) {
        let decoded = jwt.verify(token, "auth");

        if (decoded) {
            const userID = decoded.userID;
            request.body.userID = userID;
            next();
        } else {
            response.send("You are not authorized person");
        }
    } else {
        response.send("Please login first");
    }
}


module.exports = { authenticate };