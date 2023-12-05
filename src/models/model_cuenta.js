const{DataTypes}=require("sequelize")
const database=require("../database");
const perfil = require("./model_perfil");

const cuenta = database.define("cuenta",{
    
    idcuenta:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    descripcion:{
        type:DataTypes.STRING,
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
    password:{
        type:DataTypes.STRING,
    }
},{
    tableName:"cuenta",
    timestamps:false,
})

cuenta.hasMany(perfil,{
    foreignKey:"idcuenta",
    primaryKey:"idcuenta",
    sourceKey:"idcuenta",
});

module.exports=cuenta
