const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateCreate = [
    check('name').exists().not().isEmpty().withMessage('Favor cargar un título'), 
    check('icon').exists().not().isEmpty().withMessage('Favor cargar un subtítulo'), 
    check('state').exists().not().isEmpty().withMessage('Favor cargar una descripción'), 
    (req,res,next) => {
        validateResult(req,res,next)
    }
]

module.exports ={ validateCreate }