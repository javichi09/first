//importando en DotEnv
const dotenv = require('dotenv');
// Invocacion a la funcion config de
//la intancia dotenv
dotenv.config();

console.log(process.env.port);

//Creando objetos de configuracion
const defaulConfig = {
    port: process.env.port || 3000,
    ip: process.env.ip || '0.0.0.0',
};

//importing configuration keys
import configKeys from '../config/configKeys';
const devConfig ={
dev_value : 100,
};

const testConfig ={
    test_value:200,
};

const prodConfig ={
    prod_value:300,
};

//Creando una funcion selecctora 
function getEnvConfig(env){
    switch(env){
        case 'producction':
            return prodConfig;
            case 'development':
                return devConfig;
            case'test':
              return testConfig;
              default:
                return devConfig;         break;
    }
}

//Exportar el objeto de configuracion 
export default{ 
    ...defaultConfig,
    ...getEnvConfig(process.env.node_env),
};
