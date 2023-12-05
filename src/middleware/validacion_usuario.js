const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateUsuario = [
    check('nick').exists().not().isEmpty().withMessage('Favor cargar un nick'), 
    check('password').exists().not().isEmpty().withMessage('Favor cargar un password'), 
    check('email').exists().not().isEmpty().isEmail().withMessage('Favor cargar un email valido'),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]

const validateLogin = [
    check('email').exists().not().isEmpty().withMessage('Favor cargar un usuario valida'),
    check('password').exists().not().isEmpty().withMessage('Favor cargar una contraseña'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports ={ validateUsuario, validateLogin}