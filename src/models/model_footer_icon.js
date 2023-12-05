const{DataTypes}=require("sequelize")
const database=require("../database")
const icon = require('./model_icon')

const footer_icon = database.define("footer_icon",{
    
    idfooter_icon:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    href:{
        type:DataTypes.STRING,
    },
    state:{
        type:DataTypes.STRING,
    },
    idicon:{
        type:DataTypes.INTEGER,
    },

},{
    tableName:"footer_icon",
    timestamps:false,
})

footer_icon.hasOne(icon,{
    foreignKey:"idicon",
    primaryKey:"idicon",
    sourceKey:'idicon'
})

module.exports=footer_icon
