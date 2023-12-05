const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateCreate = [
    check('href').exists().not().isEmpty().withMessage('Favor cargar una descripción'), 
    check('state').exists().not().isEmpty().withMessage('Favor cargar url de imagen'),
    check('idicon').exists().not().isEmpty().withMessage('Favor cargar url de imagen'),
    //check('email').exists().not().isEmpty().isEmail().withMessage('Favor cargar un email valido'),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]

module.exports ={ validateCreate }