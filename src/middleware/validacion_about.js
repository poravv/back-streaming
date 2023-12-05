const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateCreate = [
    check('title').exists().not().isEmpty().withMessage('Favor cargar un título'), 
    check('subtitle').exists().not().isEmpty().withMessage('Favor cargar un subtítulo'), 
    check('description').exists().not().isEmpty().withMessage('Favor cargar una descripción'), 
    check('html_image').exists().not().isEmpty().withMessage('Favor cargar url de imagen'),
    check('about_background').exists().not().isEmpty().withMessage('Favor cargar url de imagen'),
    //check('email').exists().not().isEmpty().isEmail().withMessage('Favor cargar un email valido'),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]

module.exports ={ validateCreate }