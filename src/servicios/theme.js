const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const theme = require("../models/model_theme");
const database = require('../database');
const { QueryTypes } = require("sequelize");
const verificaToken = require('../middleware/token_extractor');
const { validateCreate } = require('../middleware/validacion_theme');
const { validateNivel } = require('../middleware/validacion_nivel');
require("dotenv").config();

routes.get('/getsql/', async (req, res) => {
    await database.query('select * from theme order by descripcion asc', { type: QueryTypes.SELECT })
        .then((resultado) => {
            res.json({
                mensaje: "successfully",
                body: resultado
            })
        })
})


routes.get('/get/', async (req, res) => {
    await theme.findAll().then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
})

routes.get('/getone/', async (req, res) => {
    await theme.findOne({where:{ state: 'AC' }}).then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
})

routes.get('/get/:idtheme', verificaToken, async (req, res) => {
    await theme.findByPk(req.params.idtheme).then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
});

routes.post('/post/', verificaToken, validateCreate, async (req, res) => {
    const t = await database.transaction();
    try {
        await theme.create(req.body, {
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
            detmensaje: `Error en el servidor, ${error}`
        });
        t.rollback();
    }
})


routes.put('/put/:idtheme', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        await theme.update(req.body, { where: { idtheme: req.params.idtheme } }, {
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

routes.delete('/del/:idtheme', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        await theme.destroy({ where: { idtheme: req.params.idtheme } }, {
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
