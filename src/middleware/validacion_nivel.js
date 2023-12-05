
const validateNivel = ({authData}) => {
    console.log(authData);
    const { nivel } = authData.usuario;
    if(nivel==='1'){
        return true;
    }else{
        return false;
    }
};

module.exports ={ validateNivel }