const{DataTypes}=require("sequelize")
const database=require("../database")

const logo = database.define("logo",{
    idlogo:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    
    html_image:{
        type:DataTypes.BLOB("long"),
        allowNull:false
    },
    state:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:"logo",
    timestamps:false,
})

module.exports=logo
