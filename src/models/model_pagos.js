const{DataTypes}=require("sequelize")
const database=require("../database")

const pagos = database.define("pagos",{
    
    idpagos:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    fecha_vencimiento:{
        type:DataTypes.DATE,
    },
    fecha_pago:{
        type:DataTypes.DATE,
    },
    estado:{
        type:DataTypes.STRING,
    },
    idperfil_cli_cab:{
        type:DataTypes.INTEGER,
    },
    monto_total:{
        type:DataTypes.DECIMAL(13,2),
    }
},{
    tableName:"pagos",
    timestamps:false,
})

module.exports=pagos
