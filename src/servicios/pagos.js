const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const pagos = require("../models/model_pagos");
const database = require('../database');
const { QueryTypes } = require("sequelize");
const verificaToken = require('../middleware/token_extractor');
const { validateNivel } = require('../middleware/validacion_nivel');
require("dotenv").config();


routes.get('/getsql/', async (req, res) => {

    await database.query('select * from vw_total_pagos', { type: QueryTypes.SELECT })
        .then((resultado) => {
            res.json({
                mensaje: "successfully",
                body: resultado
            })
        })
});



routes.get('/getpe/', async (req, res) => {

    await database.query(`select * from vw_total_pagos where estado='PE'`, { type: QueryTypes.SELECT })
        .then((resultado) => {
            res.json({
                mensaje: "successfully",
                body: resultado
            })
        })
})

routes.get('/get/', async (req, res) => {
    await pagos.findAll({where:{ state: 'AC' }}).then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
})

routes.get('/getall/', async (req, res) => {
    await pagos.findAll().then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
})



routes.get('/getone/', async (req, res) => {
    await pagos.findOne({where:{ state: 'AC' }}).then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
})

routes.get('/get/:idpagos', verificaToken, async (req, res) => {
    await pagos.findByPk(req.params.idpagos).then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
});

routes.post('/post/', verificaToken,  async (req, res) => {
    const t = await database.transaction();
    try {
        await pagos.create(req.body, {
            transaction: t
        }).then((resultado) => {
            jwt.verify(req.token, process.env.CLAVESECRETA, (errorAuth, authData) => {
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
                    t.commit();
                    res.json({
                        mensaje: "successfully",
                        detmensaje: "Registro almacenado satisfactoriamente",
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


routes.put('/put/:idpagos', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        await pagos.update(req.body, { where: { idpagos: req.params.idpagos } }, {
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

routes.delete('/del/:idpagos', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        await pagos.destroy({ where: { idpagos: req.params.idpagos } }, {
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
