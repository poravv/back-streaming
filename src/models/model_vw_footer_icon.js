const{DataTypes}=require("sequelize")
const database=require("../database")
const icon = require('./model_icon')

const vw_footer_icon = database.define("vw_footer_icon",{
    
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
    name:{
        type:DataTypes.STRING,
    },
    idicon:{
        type:DataTypes.INTEGER,
    },

},{
    tableName:"vw_footer_icon",
    timestamps:false,
})

vw_footer_icon.hasOne(icon,{
    foreignKey:"idicon",
    primaryKey:"idicon",
    sourceKey:'idicon'
})


module.exports=vw_footer_icon
