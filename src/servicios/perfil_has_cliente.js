const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const perfil_has_cliente = require("../models/model_perfil_has_cliente");
const database = require('../database');
const { QueryTypes } = require("sequelize");
const verificaToken = require('../middleware/token_extractor');
const perfil_cli_cab = require('../models/model_perfil_cli_cab');
const cliente = require('../models/model_cliente');
const perfil = require('../models/model_perfil');
const vw_perfil_cuenta = require('../models/model_vw_perfil_cuenta');
require("dotenv").config();
let fechaActual = new Date();


routes.get('/getsql/', async (req, res) => {
    await database.query('select * from vw_perfiles_clientes', { type: QueryTypes.SELECT })
        .then((resultado) => {
            res.json({
                mensaje: "successfully",
                body: resultado
            })
        });
})


routes.get('/get/', async (req, res) => {
    await perfil_has_cliente.findAll({ where: { state: 'AC' } }).then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
})

routes.get('/getDC/', async (req, res) => {

    await perfil_cli_cab.findAll({
        include: [
            { model: cliente },
            {
                model: perfil_has_cliente, include: [
                    { model: vw_perfil_cuenta }
                ]
            },
        ]
    }).then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
})

routes.get('/getall/', async (req, res) => {
    await perfil_has_cliente.findAll().then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
})



routes.get('/getone/', async (req, res) => {
    await perfil_has_cliente.findOne({ where: { state: 'AC' } }).then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
})

routes.get('/get/:idperfil_has_cliente', verificaToken, async (req, res) => {
    await perfil_has_cliente.findByPk(req.params.idperfil_has_cliente).then((resultado) => {
        res.json({
            mensaje: "successfully",
            body: resultado
        })
    })
});

routes.post('/post/', verificaToken, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.CLAVESECRETA, async (errorAuth, authData) => {
            if (errorAuth) {
                res.json({
                    mensaje: "error",
                    detmensaje: "Error de autenticacion",
                    error: errorAuth
                });
            } else {

                const strFecha = fechaActual.getFullYear() + "-" + (fechaActual.getMonth() + 1) + "-" + fechaActual.getDate();
                let perfil_cliente = '';
                //Aqui inicia la cabecera
                try {
                    //console.log('Body:::::',req.body)

                    const tcab = await database.transaction();
                    let verificaCliente = true;
                    perfil_cliente = await perfil_cli_cab.findOne({ where: { idcliente: req.body.idcliente } });
                    if (perfil_cliente) {
                        verificaCliente = false;
                    }

                    //console.log(`perfil_cliente:::::${perfil_cliente?.idperfil_cli_cab}`)

                    if (verificaCliente) {
                        perfil_cliente = await perfil_cli_cab.create(req.body, {
                            transaction: tcab
                        });
                    } else {
                        perfil_cli_cab.update(req.body, { where: { idperfil_cli_cab: perfil_cliente.idperfil_cli_cab } }, {
                            transaction: tcab
                        });
                    }

                    tcab.commit();
                } catch (error) {
                    console.log(error)
                    res.json({
                        mensaje: "error",
                        error: error,
                        detmensaje: `Error en el servidor, ${error}`
                    });
                }

                req.body.detalle.map(async (det) => {
                    const t = await database.transaction();
                    det.fecha_insert = strFecha;
                    det.fecha_upd = strFecha;
                    delete det.perfil;
                    det.idperfil_cli_cab = perfil_cliente.idperfil_cli_cab;
                    //console.log('::::', det);
                    await perfil_has_cliente.create(det, {
                        transaction: t
                    });
                    t.commit();
                    return true;
                });



                req.body.detalle.map(async (det) => {
                    const tperfil = await database.transaction();
                    await perfil.update({ estado: 'UT' }, { where: { idperfil: det.idperfil } }, {
                        transaction: tperfil
                    });
                    tperfil.commit();
                    return true;
                });

                res.json({
                    mensaje: "successfully",
                    detmensaje: "Registro almacenado satisfactoriamente",
                });
            }
        });

    } catch (error) {
        res.json({
            mensaje: "error",
            error: error,
            detmensaje: `Error en el servidor, ${error}`
        });
    }
})


routes.put('/putpcc/:idperfil_cli_cab', verificaToken, async (req, res) => {
    
    delete req.body.cliente;
    delete req.body.perfil_has_clientes;
    console.log(req.body)

    const t = await database.transaction();
    try {
        await perfil_cli_cab.update(req.body, { where: { idperfil_cli_cab: req.params.idperfil_cli_cab } }, {
            transaction: t
        }).then((resultado) => {
            jwt.verify(req.token, process.env.CLAVESECRETA, (errorAuth, authData) => {
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


routes.put('/put/:idperfil_cli_cab', verificaToken, async (req, res) => {

    const t = await database.transaction();
    try {
        await perfil_has_cliente.update(req.body, { where: { idperfil_cli_cab: req.params.idperfil_cli_cab } }, {
            transaction: t
        }).then((resultado) => {
            jwt.verify(req.token, process.env.CLAVESECRETA, (errorAuth, authData) => {
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

routes.delete('/del/:idperfil', verificaToken, async (req, res) => {
    const t = await database.transaction();
    const tperfil = await database.transaction();
    try {
        await perfil_has_cliente.destroy({ where: { idperfil: req.params.idperfil } }, {
            transaction: t
        }).then((resultado) => {
            jwt.verify(req.token, process.env.CLAVESECRETA, async (errorAuth, authData) => {
                if (errorAuth) {
                    res.json({
                        mensaje: "error",
                        detmensaje: "Error de autenticacion",
                        error: errorAuth
                    });
                } else {
                    await perfil.update({ estado: 'AC' }, { where: { idperfil: req.params.idperfil  } }, {
                        transaction: tperfil
                    });
                    tperfil.commit();
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
