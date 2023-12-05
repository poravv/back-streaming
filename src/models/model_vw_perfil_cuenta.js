const{DataTypes}=require("sequelize")
const database=require("../database")

const vw_perfil_cuenta = database.define("vw_perfil_cuenta",{
    
    idperfil:{
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
    password:{
        type:DataTypes.STRING,
    },
    idcuenta:{
        type:DataTypes.INTEGER,
    },
    cuenta:{
        type:DataTypes.STRING,
    }
},{
    tableName:"vw_perfil_cuenta",
    timestamps:false,
});

module.exports=vw_perfil_cuenta
