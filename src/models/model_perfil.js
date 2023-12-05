const{DataTypes}=require("sequelize")
const database=require("../database")

const perfil = database.define("perfil",{
    
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
    }
},{
    tableName:"perfil",
    timestamps:false,
});



module.exports=perfil
