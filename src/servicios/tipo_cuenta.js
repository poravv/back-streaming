const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const tipo_cuenta = require("../models/model_tipo_cuenta")
const database = require('../database')
const { QueryTypes } = require("sequelize")
const verificaToken = require('../middleware/token_extractor')
require("dotenv").config()

routes.get('/getsql/', verificaToken, async (req, res) => {
    try {
        const tipo_cuentaes = await database.query('select * from tipo_cuenta order by descripcion asc', { type: QueryTypes.SELECT })
        jwt.verify(req.token, process.env.CLAVESECRETA, (error, authData) => {
            if (error) {
                res.json({estado: "error",mensaje:error,})
            } else {
                res.json({
                    estado: "successfully",
                    body: tipo_cuentaes
                })
            }
        })
    } catch (error) {
        res.json({estado: "error",mensaje: error, })
    }
})


routes.get('/get/', verificaToken, async (req, res) => {

    try {
        const tipo_cuentaes = await tipo_cuenta.findAll();
        jwt.verify(req.token, process.env.CLAVESECRETA, (error, authData) => {
            if (error) {
                res.json({estado: "error",mensaje:error,});
            } else {
                res.json({
                    estado: "successfully",
                    body: tipo_cuentaes
                })
            }
        })
    } catch (error) {
        res.json({estado: "error",mensaje: error,})
    }
})

routes.get('/get/:idtipo_cuenta', verificaToken, async (req, res) => {
    try {
        
        const tipo_cuentaes = await tipo_cuenta.findByPk(req.params.idtipo_cuenta)
        jwt.verify(req.token, process.env.CLAVESECRETA, (error, authData) => {
            if (error) {
                res.json({estado: "error",mensaje:error,});
            } else {
                res.json({
                    estado: "successfully",
                    body: tipo_cuentaes
                });
            }
        })
    } catch (error) {
        res.json({estado: "error",mensaje:error});
    }
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        const tipo_cuentaes = await tipo_cuenta.create(req.body, {
            transaction: t
        });
        jwt.verify(req.token, process.env.CLAVESECRETA, (error, authData) => {
            if (error) {
                res.json({estado: "error",mensaje:error,});
            } else {
                t.commit();
                res.json({
                    estado: "successfully",
                    mensaje:'Registro almacenado correctamente',
                    body: tipo_cuentaes
                })
            }
        })
    } catch (error) {
        t.rollback();
        res.json({estado: "error",mensaje:error,});
    }
})

routes.put('/put/:idtipo_cuenta', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        const tipo_cuentaes = await tipo_cuenta.update(req.body, { where: { idtipo_cuenta: req.params.idtipo_cuenta } }, {
            transaction: t
        });
        jwt.verify(req.token, process.env.CLAVESECRETA, (error, authData) => {
            if (error) {
                res.json({estado: "error",mensaje:error,})
            } else {
                t.commit();
                res.json({
                    estado:'successfully',
                    mensaje: "Registro actualizado correctamente",
                    authData: authData,
                    body: tipo_cuentaes
                })
            }
        })
    } catch (error) {
        t.rollback();
        res.json({estado: "error",mensaje:error,})
    }
})

routes.delete('/del/:idtipo_cuenta', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        const tipo_cuentaes = await tipo_cuenta.destroy({ where: { idtipo_cuenta: req.params.idtipo_cuenta } }, {
            transaction: t
        });
        jwt.verify(req.token, process.env.CLAVESECRETA, (error, authData) => {
            if (error) {
                res.json({estado: "error",mensaje:error,});
            } else {
                t.commit();
                res.json({
                    estado:"successfully",
                    mensaje: "Registro eliminado",
                    body: tipo_cuentaes
                })
            }
        })
    } catch (error) {
        t.rollback();
        res.json({estado: "error",mensaje:error,})
    }
})


module.exports = routes;