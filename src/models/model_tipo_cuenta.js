const{DataTypes}=require("sequelize")
const database=require("../database")

const tipo_cuenta = database.define("tipo_cuenta",{
    
    idtipo_cuenta:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    tableName:"tipo_cuenta",
    timestamps:false
})

module.exports=tipo_cuenta
