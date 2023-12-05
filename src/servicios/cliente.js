const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const cliente = require("../models/model_cliente")
const database = require('../database');
const e = require('express');
const verificaToken = require('../middleware/token_extractor');
const { QueryTypes } = require('sequelize');
require("dotenv").config()
let fechaActual = new Date();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

routes.get('/getsql/', verificaToken, async (req, res) => {
    try {
        const clientes = await database.query(`select * from vw_cliente where estado='AC'`, { type: QueryTypes.SELECT })
        jwt.verify(req.token, process.env.CLAVESECRETA, (error, authData) => {
            if (error) {
                res.json({ estado: "error", mensaje: error, })
            } else {
                res.json({
                    estado: "successfully",
                    body: clientes
                })
            }
        })
    } catch (error) {
        res.json({ estado: "error", mensaje: error, })
    }
})

routes.get('/likecliente/:documento', verificaToken, async (req, res) => {
    try {
        const rsclientes = await cliente.findAll({
            where: {
                documento: {
                    [Op.like]: `${req.params.documento}%`
                }
            }
        });
        console.log(rsclientes)
        jwt.verify(req.token, process.env.CLAVESECRETA, (error, authData) => {
            if (error) {
                res.json({ estado: "error", mensaje: error });;
            } else {
                res.json({
                    estado: "successfully",
                    body: rsclientes
                });
            }
        })
    } catch (error) {
        res.json({ estado: "error", mensaje: error, })
    }
})

routes.get('/get/', verificaToken, async (req, res) => {
    try {
        const clientes = await cliente.findAll()
        jwt.verify(req.token, process.env.CLAVESECRETA, (error, authData) => {
            if (error) {
                res.json({ estado: "error", mensaje: error });
            } else {
                res.json({
                    estado: "successfully",
                    body: clientes
                })
            }
        })
    } catch (error) {
        res.json({ estado: "error", mensaje: error, })
    }
})

routes.get('/get/:idcliente', verificaToken, async (req, res) => {
    try {
        const clientes = await cliente.findByPk(req.params.idcliente, )
        jwt.verify(req.token, process.env.CLAVESECRETA, (error, authData) => {
            if (error) {
                res.json({ estado: "error", mensaje: error });
            } else {
                res.json({
                    estado: "successfully",
                    body: clientes
                })
            }
        })
    } catch (error) {
        res.json({ estado: "error", mensaje: error, })
    }
})

routes.post('/post/', verificaToken, async (req, res) => {
    const t = await database.transaction();

    try {
        jwt.verify(req.token, process.env.CLAVESECRETA, async (error, authData) => {
            if (error) {
                res.json({ estado: "error", mensaje: error });
            } else {
                const strFecha = fechaActual.getFullYear() + "-" + (fechaActual.getMonth() + 1) + "-" + fechaActual.getDate();
                req.body.fecha_insert = strFecha;
                req.body.fecha_upd = strFecha;
                req.body.idusuario_upd = authData?.rsusuario?.idusuario;
                const clientes = await cliente.create(req.body, { transaction: t })
                t.commit();
                res.json({
                    estado: "successfully",
                    mensaje: "Registro almacenado correctamente",
                    body: clientes
                })
            }
        })
    } catch (error) {
        res.json({ estado: "error", mensaje: error });
        t.rollback();
    }

})

routes.put('/put/:idcliente', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {

        jwt.verify(req.token, process.env.CLAVESECRETA, async (error, authData) => {
            if (error) {
                res.json({ estado: "error", mensaje: error });
            } else {
                const strFecha = fechaActual.getFullYear() + "-" + (fechaActual.getMonth() + 1) + "-" + fechaActual.getDate();
                req.body.fecha_upd = strFecha;
                req.body.idusuario_upd = authData?.rsusuario?.idusuario;
                const clientes = await cliente.update(req.body, { where: { idcliente: req.params.idcliente }, transaction: t })
                t.commit();
                res.json({
                    estado: "successfully",
                    mensaje: "Registro actualizado correctamente",
                    body: clientes
                })
            }
        })
    } catch (error) {
        res.json({ estado: "error", mensaje: error });
        t.rollback();
    }

})

routes.delete('/del/:idcliente', verificaToken, async (req, res) => {
    const t = await database.transaction();
    try {
        const clientes = await cliente.destroy({ where: { idcliente: req.params.idcliente }, transaction: t })
        jwt.verify(req.token, process.env.CLAVESECRETA, (error, authData) => {
            if (error) {
                res.json({ estado: "error", mensaje: error });
            } else {
                t.commit();
                res.json({
                    estado: "successfully",
                    mensaje: "Registro eliminado",
                    body: clientes
                })
            }
        })
    } catch (error) {
        res.json({ estado: "error", mensaje: error });
        t.rollback();
    }

})


module.exports = routes;