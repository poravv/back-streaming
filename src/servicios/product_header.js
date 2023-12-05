const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const product_header = require("../models/model_product_header");
const database = require('../database');
const { QueryTypes } = require("sequelize");
const verificaToken = require('../middleware/token_extractor');
const { validateCreate } = require('../middleware/validacion_product_header');
const { validateNivel } = require('../middleware/validacion_nivel');
require("dotenv").config();

routes.get('/getsql/', async (req, res) => {
    await database.query('select * from product_header order by descripcion asc', { type: QueryTypes.SELECT })
        .then((resultado) => {
            res.json({
                mensaje: "successfully",
                body: resultado
            })
        })
})


routes.get('/get/', async (req, res) => {
    await product_header.findAll({where:{ state: 'AC' }}).then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
})

routes.get('/getall/', async (req, res) => {
    await product_header.findAll().then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
})

routes.get('/getone/', async (req, res) => {
    await product_header.findOne({where:{ state: 'AC' }}).then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
})

routes.get('/get/:idproduct_header', verificaToken, async (req, res) => {
    await product_header.findByPk(req.params.idproduct_header).then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
});

routes.post('/post/', verificaToken, validateCreate, async (req, res) => {
    const t = await database.transaction();
    try {
        await product_header.create(req.body, {
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


routes.put('/put/:idproduct_header', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        await product_header.update(req.body, { where: { idproduct_header: req.params.idproduct_header } }, {
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

routes.delete('/del/:idproduct_header', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        await product_header.destroy({ where: { idproduct_header: req.params.idproduct_header } }, {
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
