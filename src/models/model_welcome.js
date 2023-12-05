const{DataTypes}=require("sequelize")
const database=require("../database")

const welcome = database.define("welcome",{
    
    idwelcome:{
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
        allowNull:false
    },
    button_label:{
        type:DataTypes.STRING,
        allowNull:false
    },
    html_image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    button_href:{
        type:DataTypes.STRING,
        allowNull:false
    },
    state:{
        type:DataTypes.STRING,
        allowNull:false
    },

},{
    tableName:"welcome",
    timestamps:false,
})

module.exports=welcome
