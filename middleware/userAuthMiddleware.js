const jwt = require("jsonwebtoken");

const userAuthMiddleWare = async (req, res,next) => {
    try {
        let token = req.headers["authorization"];
        if (!token.startsWith('Bearer')) throw Error(" ");
        token = token.split(' ')[1]
        req.user = await jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).send({ status: false, Error: "InValid token" })
    }
}

module.exports = userAuthMiddleWare