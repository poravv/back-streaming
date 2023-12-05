const{DataTypes}=require("sequelize")
const database=require("../database")
const cliente = require("./model_cliente");
const perfil_has_cliente = require("./model_perfil_has_cliente");

const perfil_cli_cab = database.define("perfil_cli_cab",{
    
    idperfil_cli_cab:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    costo_total:{
        type:DataTypes.DECIMAL(13,2),
    },
    estado:{
        type:DataTypes.STRING,
    },
    idcliente:{
        type:DataTypes.STRING,
    },
    fecha_pago:{
        type:DataTypes.STRING,
    },
},{
    tableName:"perfil_cli_cab",
    timestamps:false,
});

perfil_cli_cab.hasOne(cliente,{
    foreignKey:"idcliente",
    primaryKey:"idcliente",
    sourceKey:"idcliente",
});

perfil_cli_cab.hasMany(perfil_has_cliente,{
    foreignKey:"idperfil_cli_cab",
    primaryKey:"idperfil_cli_cab",
    sourceKey:"idperfil_cli_cab",
});

module.exports=perfil_cli_cab
