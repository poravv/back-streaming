const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateCreate = [
    check('html_image').exists().not().isEmpty().withMessage('Favor cargar url de imagen'),
    //check('email').exists().not().isEmpty().isEmail().withMessage('Favor cargar un email valido'),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]

module.exports ={ validateCreate }