const{DataTypes}=require("sequelize")
const database=require("../database")

const footer_label = database.define("footer_label",{
    
    idfooter_label:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    description:{
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

},{
    tableName:"footer_label",
    timestamps:false,
})

module.exports=footer_label
