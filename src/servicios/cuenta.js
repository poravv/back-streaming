const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const cuenta = require("../models/model_cuenta");
const database = require('../database');
const { QueryTypes } = require("sequelize");
const verificaToken = require('../middleware/token_extractor');
const { validateNivel } = require('../middleware/validacion_nivel');
const perfil = require('../models/model_perfil');
require("dotenv").config();
let fechaActual = new Date();


routes.get('/getsql/', async (req, res) => {
    await database.query(`select * from vw_cuenta_perfil where estado='AC'`, { type: QueryTypes.SELECT })
        .then((resultado) => {
            res.json({
                mensaje: "successfully",
                body: resultado
            })
        })
})


routes.get('/get/', async (req, res) => {
    await cuenta.findAll({include:{model:perfil} ,where: { estado: 'AC' } }).then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
})

routes.get('/getall/', async (req, res) => {
    await cuenta.findAll().then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
})



routes.get('/getone/', async (req, res) => {
    await cuenta.findOne({ where: { estado: 'AC' } }).then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
})

routes.get('/get/:idcuenta', verificaToken, async (req, res) => {
    await cuenta.findByPk(req.params.idcuenta).then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
});

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    const tdet = await database.transaction();
    try {
        jwt.verify(req.token, process.env.CLAVESECRETA, async (errorAuth, authData) => {
            if (!validateNivel({ authData: authData })) {
                res.json({
                    mensaje: "error",
                    detmensaje: "No posee nivel para la creacion de registro"
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
                const strFecha = fechaActual.getFullYear() + "-" + (fechaActual.getMonth() + 1) + "-" + fechaActual.getDate();
                req.body.fecha_insert = strFecha;
                req.body.fecha_upd = strFecha;

                const resultado = await cuenta.create(req.body, {
                    transaction: t
                }).then(async (cab) => {
                    req.body.perfil.map(async (det) => {
                        det.idcuenta = cab.idcuenta;
                        //console.log(det)
                        await perfil.create(det, {
                            transaction: tdet
                        });
                        return true;
                    });

                    await t.commit();
                    await tdet.commit();

                });
                res.json({
                    mensaje: "successfully",
                    detmensaje: "Registro almacenado satisfactoriamente",
                    //authData: authData,
                    body: resultado
                });
            }
        });

    } catch (error) {
        res.json({
            mensaje: "error",
            error: error,
            detmensaje: "Error en el servidor, verifique los campos cargados, de lo contrario contacte con el administrador"
        });
        t.rollback();
        tdet.rollback();
    }
})


routes.put('/put/:idcuenta', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        await cuenta.update(req.body, { where: { idcuenta: req.params.idcuenta } }, {
            transaction: t
        }).then((resultado) => {
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
                        detmensaje: "Registro actualizado satisfactoriamente",
                        authData: authData,
                        body: resultado
                    });
                }
            });
        });
    } catch (error) {
        res.json({
            mensaje: "error",
            error: error,
            detmensaje: "Error en el servidor, verifique los campos cargados, de lo contrario contacte con el administrador"
        });
        t.rollback();
    }
})

routes.delete('/del/:idcuenta', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        await cuenta.destroy({ where: { idcuenta: req.params.idcuenta } }, {
            transaction: t
        }).then((resultado) => {
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
                        body: resultado
                    });
                }
            });
        });
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
