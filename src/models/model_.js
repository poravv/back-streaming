const{DataTypes}=require("sequelize")
const database=require("../database")

const cliente = database.define("cliente",{
    
    idcliente:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    nombre:{
        type:DataTypes.STRING,
    },
    apellido:{
        type:DataTypes.STRING,
    },
    documento:{
        type:DataTypes.STRING,
    },
    direccion:{
        type:DataTypes.STRING,
    },
    estado:{
        type:DataTypes.STRING,
    },

},{
    tableName:"cliente",
    timestamps:false,
})

module.exports=cliente
