const{DataTypes}=require("sequelize")
const database=require("../database");
const vw_perfil_cuenta = require("./model_vw_perfil_cuenta");

const perfil_has_cliente = database.define("perfil_has_cliente",{
    
    idperfil:{
        type:DataTypes.INTEGER,
        primaryKey:true,
    },
    idperfil_cli_cab:{
        type:DataTypes.INTEGER,
        primaryKey:true,
    },
    estado:{
        type:DataTypes.STRING,
    },
    fecha_insert:{
        type:DataTypes.DATE,
    },
    fecha_upd:{
        type:DataTypes.DATE,
    },
},{
    tableName:"perfil_has_cliente",
    timestamps:false,
})

perfil_has_cliente.hasOne(vw_perfil_cuenta,{
    foreignKey:"idperfil",
    primaryKey:"idperfil",
    sourceKey:"idperfil",
});

module.exports=perfil_has_cliente
