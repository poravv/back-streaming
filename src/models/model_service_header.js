const{DataTypes}=require("sequelize")
const database=require("../database")

const service_header = database.define("service_header",{
    
    idservice_header:{
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

},{
    tableName:"service_header",
    timestamps:false,
})

module.exports=service_header
