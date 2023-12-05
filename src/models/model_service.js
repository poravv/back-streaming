const{DataTypes}=require("sequelize")
const database=require("../database")

const service = database.define("service",{
    
    idservice:{
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
    description:{
        type:DataTypes.STRING,
    },
    html_image:{
        type:DataTypes.BLOB("long"),
        allowNull:false
    },
    href:{
        type:DataTypes.STRING,
        allowNull:false
    },
    state:{
        type:DataTypes.STRING,
        allowNull:false
    },
    destacado:{
        type:DataTypes.STRING,
        allowNull:false
    },

},{
    tableName:"service",
    timestamps:false,
})

module.exports=service
