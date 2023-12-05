const{DataTypes}=require("sequelize")
const database=require("../database")

const about = database.define("about",{
    
    idabout:{
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
    html_image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    state:{
        type:DataTypes.STRING,
        allowNull:false
    },
    about_background:{
        type:DataTypes.STRING,
        allowNull:false
    },
    

},{
    tableName:"about",
    timestamps:false,
})

module.exports=about
