const { validationResult } = require("express-validator")


const handleValidationErrors = (req, res, next) => {
    try {
        const Errors = validationResult(req);
        if (!Errors.isEmpty()) {
            return res.status(400).send({ status: false, Error: Errors.array() })
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = handleValidationErrors