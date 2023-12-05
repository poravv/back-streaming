const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateCreate = [
    check('header_color').exists().not().isEmpty().withMessage('Favor cargar un título'), 
    check('header_title_color').exists().not().isEmpty().withMessage('Favor cargar un subtítulo'), 
    check('content_background_color').exists().not().isEmpty().withMessage('Favor cargar una descripción'), 
    check('footer_background_color1').exists().not().isEmpty().withMessage('Favor cargar una descripción para el botón'), 
    check('footer_title_color').exists().not().isEmpty().withMessage('Favor cargar url de imagen'),
    check('footer_icon_color').exists().not().isEmpty().withMessage('Favor cargar url de imagen'),
    check('content_title_color').exists().not().isEmpty().withMessage('Favor cargar url de imagen'),
    check('content_subtitle_color').exists().not().isEmpty().withMessage('Favor cargar url de imagen'),
    check('content_description_color').exists().not().isEmpty().withMessage('Favor cargar url de imagen'),
    //check('email').exists().not().isEmpty().isEmail().withMessage('Favor cargar un email valido'),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]

module.exports ={ validateCreate }