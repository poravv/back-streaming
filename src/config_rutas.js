const express = require('express');
const rutas = express()

const welcome = require('./servicios/welcome')
const about = require('./servicios/about')
const theme = require('./servicios/theme')
const service_header = require('./servicios/service_header')
const product_header = require('./servicios/product_header')
const footer_header = require('./servicios/footer_header')
const destacado_header = require('./servicios/destacado_header')
const service = require('./servicios/service')
const product = require('./servicios/product')
const footer_label = require('./servicios/footer_label')
const footer_icon = require('./servicios/footer_icon')
const usuario = require('./servicios/usuario')
const icon = require('./servicios/icon');
const logo = require('./servicios/logo');

const perfil = require('./servicios/perfil');
const pagos = require('./servicios/pagos');
const cuenta = require('./servicios/cuenta');
const cliente = require('./servicios/cliente');
const perfil_has_cliente = require('./servicios/perfil_has_cliente');
const tipo_cuenta = require('./servicios/tipo_cuenta');

rutas.use('/onlinetine/api/welcome',welcome);
rutas.use('/onlinetine/api/about',about);
rutas.use('/onlinetine/api/theme',theme);
rutas.use('/onlinetine/api/service_header',service_header);
rutas.use('/onlinetine/api/product_header',product_header);
rutas.use('/onlinetine/api/footer_header',footer_header);
rutas.use('/onlinetine/api/destacado_header',destacado_header);
rutas.use('/onlinetine/api/service',service);
rutas.use('/onlinetine/api/product',product);
rutas.use('/onlinetine/api/footer_label',footer_label);
rutas.use('/onlinetine/api/footer_icon',footer_icon);
rutas.use('/onlinetine/api/usuario',usuario);
rutas.use('/onlinetine/api/icon',icon);
rutas.use('/onlinetine/api/logo',logo);
rutas.use('/onlinetine/api/tipo_cuenta',tipo_cuenta);

rutas.use('/onlinetine/api/cliente',cliente);
rutas.use('/onlinetine/api/perfil',perfil);
rutas.use('/onlinetine/api/pagos',pagos);
rutas.use('/onlinetine/api/cuenta',cuenta);
rutas.use('/onlinetine/api/perfil_has_cliente',perfil_has_cliente);

module.exports = rutas;