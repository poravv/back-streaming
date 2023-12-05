const{DataTypes}=require("sequelize")
const database=require("../database")

const footer_header = database.define("footer_header",{
    
    idfooter_header:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    label1:{
        type:DataTypes.STRING,
        allowNull:false
    },
    label2:{
        type:DataTypes.STRING,
        allowNull:false
    },
    state:{
        type:DataTypes.STRING,
        allowNull:false
    },

},{
    tableName:"footer_header",
    timestamps:false,
})

module.exports=footer_header
