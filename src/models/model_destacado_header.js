const{DataTypes}=require("sequelize")
const database=require("../database")

const destacado_header = database.define("destacado_header",{
    
    iddestacado_header:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    subtitle:{
        type:DataTypes.STRING,
        allowNull:false
    },
    state:{
        type:DataTypes.STRING,
        allowNull:false
    },
    tipo:{
        type:DataTypes.STRING,
        allowNull:false
    },

},{
    tableName:"destacado_header",
    timestamps:false,
})

module.exports=destacado_header
