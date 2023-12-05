const{DataTypes}=require("sequelize")
const database=require("../database")

const usuario = database.define("usuario",{
    
    idusuario:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    nick:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    nivel:{
        type:DataTypes.STRING,
        allowNull:false
    },
    state:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:"usuario",
    timestamps:false,
})

module.exports=usuario
