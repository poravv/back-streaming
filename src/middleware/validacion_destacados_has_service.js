const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateCreate = [
    check('iddestacados').exists().not().isEmpty().withMessage('Favor cargar un título'), 
    check('idservice').exists().not().isEmpty().withMessage('Favor cargar un subtítulo'), 
    (req,res,next) => {
        validateResult(req,res,next)
    }
]

module.exports ={ validateCreate }