const{DataTypes}=require("sequelize")
const database=require("../database")

const product = database.define("product",{
    
    idproduct:{
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
        type:DataTypes.STRING,
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
    precio:{
        type:DataTypes.DECIMAL(13,2),
        allowNull:false
    },
},{
    tableName:"product",
    timestamps:false,
})

module.exports=product
