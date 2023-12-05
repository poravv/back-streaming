const{DataTypes}=require("sequelize")
const database=require("../database")

const product_header = database.define("product_header",{
    
    idproduct_header:{
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
    tableName:"product_header",
    timestamps:false,
})

module.exports=product_header
