
const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const model_usuario = require("../models/model_usuario")
const database = require('../database')
const verificaToken = require('../middleware/token_extractor')
const { validateUsuario, validateLogin } = require('../middleware/validacion_usuario');
const { validateNivel } = require('../middleware/validacion_nivel');
const md5 = require('md5');
require("dotenv").config()

routes.post('/login/', validateLogin, async (req, res) => {
    try {
        const { email, password } = req.body;
        await model_usuario.findOne(
            { where: { email: email, password: md5(password) } }).then((usuario) => {
                if (usuario.length != 0) {
                    jwt.sign({ usuario }, process.env.CLAVESECRETA
                        , { expiresIn: '12h' }//Para personalizar el tiempo para expirar
                        , (error, token) => {
                            res.json({
                                mensaje: "successfully",
                                token,
                                body: usuario
                            });
                        });
                } else {
                    res.status(400).json(
                        {
                            mensaje: "error",
                            detmensaje: "Usuario no existe"
                        }
                    );
                }
            })
    } catch (error) {
        res.status(400).json(
            {
                mensaje: "error",
                detmensaje: "Error de acceso, favor contacte con el administrador"
            }
        );
    }
});

routes.get('/get/', verificaToken, async (req, res) => {
    await model_usuario.findAll().then((usuarios) => {
        jwt.verify(req.token, process.env.CLAVESECRETA, (errorAuth, authData) => {
            if (errorAuth) {
                res.json({
                    mensaje: "error",
                    detmensaje: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador",
                    errorAuth
                });
            } else {
                res.json({
                    mensaje: "successfully",
                    authData: authData,
                    body: usuarios
                })
            }
        })
    })


})

routes.get('/get/:idusuario', verificaToken, async (req, res) => {
    const usuarios = await model_usuario.findByPk(req.params.idusuario,)
    jwt.verify(req.token, process.env.CLAVESECRETA, (errorAuth, authData) => {
        if (errorAuth) {
            res.json({
                mensaje: "error",
                detmensaje: "Error de autenticacion, vuelva a iniciar la sesion, sino, contacte con el administrador",
                error: errorAuth
            });
        } else {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: usuarios
            })
        }
    })
})

routes.post('/post/', validateUsuario, async (req, res) => {
    const tusu = await database.transaction();
    try {
        req.body.password = md5(req.body.password);
        jwt.verify(req.token, process.env.CLAVESECRETA, async (errorAuth, authData) => {
            if (errorAuth) {
                //Logica para los que no tienen token
                req.body.nivel = 3;
            } else {
                //Logica para los que si tienen token
                if (!validateNivel({ authData: authData })) {
                    res.json({
                        mensaje: "error",
                        detmensaje: "No posee nivel para crear usuario"
                    });
                    return;
                };
            }
            await model_usuario.create(req.body.usuario, { transaction: tusu }).then((user) => {
                tusu.commit();
                res.json({
                    mensaje: "successfully",
                    detmensaje: "Registro almacenado satisfactoriamente",
                    body: user
                });
            })
        });

    } catch (error) {
        tusu.rollback();
        res.json({
            mensaje: "error",
            error: error,
            detmensaje: "Error en el servidor, verifique los campos cargados, de lo contrario contacte con el administrador"
        });

    }
})

routes.put('/put/:idusuario', verificaToken, async (req, res) => {
    const tusu = await database.transaction();
    let validacionPassword = false;
    await model_usuario.findByPk(req.params.idusuario).then((user) => {
        console.log(user.password)
        console.log(md5(req.body.password))
        if (user.password !== md5(req.body.password)) {
            //Logica para verificar que la contrasena coincida
            res.json({
                mensaje: "error",
                detmensaje: "Verifique la contraseña actual de la cuenta"
            });
            return;
        } else {
            validacionPassword = true;
        }
    });

    if (!validacionPassword) return;

    if (req.body.newpassword !== '' && req.body.newpassword !== null) {
        req.body.password = md5(req.body.newpassword);
    } else {
        req.body.password = md5(req.body.password);
    }

    try {
        jwt.verify(req.token, process.env.CLAVESECRETA, async (errorAuth, authData) => {

            if (errorAuth) {
                //Logica para los que si tienen token
                if (!validateNivel({ authData: authData })) {
                    res.json({
                        mensaje: "error",
                        detmensaje: "Error de autenticacion"
                    });
                    return;
                };
            }
            const user = await model_usuario.update(req.body.usuario, { where: { idusuario: req.params.idusuario } }, { transaction: tusu }).then((user) => {
                tusu.commit();
            });

            res.json({
                mensaje: "successfully",
                detmensaje: "Registro almacenado satisfactoriamente",
                body: user
            });
        });

    } catch (error) {
        tusu.rollback();
        res.json({
            mensaje: "error",
            error: error,
            detmensaje: "Error en el servidor, verifique los campos cargados, de lo contrario contacte con el administrador"
        });

    }
})

routes.delete('/del/:idusuario', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        await model_usuario.destroy({ where: { idusuario: req.params.idusuario }, transaction: t }).then((usuarios) => {
            jwt.verify(req.token, process.env.CLAVESECRETA, (errorAuth, authData) => {
                if (!validateNivel({ authData: authData })) {
                    res.json({
                        mensaje: "error",
                        detmensaje: "No posee nivel para actualizar"
                    });
                    return;
                };
                if (errorAuth) {
                    res.json({
                        mensaje: "error",
                        detmensaje: "Error de autenticacion",
                        error: errorAuth
                    });
                } else {
                    t.commit();
                    res.json({
                        mensaje: "successfully",
                        detmensaje: "Registro eliminado satisfactoriamente",
                        authData: authData,
                        body: usuarios
                    });
                }
            });
        })
    } catch (error) {
        res.json({
            mensaje: "error",
            error: error,
            detmensaje: "Error en el servidor, verifique los campos cargados, de lo contrario contacte con el administrador"
        });
        t.rollback();
    }
})


module.exports = routes;