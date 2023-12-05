const { validationResult } = require('express-validator'); //TODO:

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        res.status(403).send({
            mensaje: "error",
            detmensaje: "Error en la validacion de datos",
            error:error.errors
        });
    }
}

module.exports = { validateResult }