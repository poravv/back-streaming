const{DataTypes}=require("sequelize")
const database=require("../database")

const icon = database.define("icon",{
    
    idicon:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
    },
    icon:{
        type:DataTypes.STRING,
    },
    state:{
        type:DataTypes.STRING,
    },

},{
    tableName:"icon",
    timestamps:false,
})

module.exports=icon
