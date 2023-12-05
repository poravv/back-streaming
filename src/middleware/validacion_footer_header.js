const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateCreate = [
    check('label1').exists().not().isEmpty().withMessage('Favor cargar un título'), 
    check('label2').exists().not().isEmpty().withMessage('Favor cargar un subtítulo'), 
    (req,res,next) => {
        validateResult(req,res,next)
    }
]

module.exports ={ validateCreate }