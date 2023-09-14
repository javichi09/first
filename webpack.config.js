//importar el metodo path 
const path = requiere('path');

//exportamos na configyracion
module.exports = { 
    //1. establecer el archivo indexador
    // de front-end
    entry: "./client/index.js",
    //2. estableciendo el archivo de salida
    output: {
        //ruta absoluta de salida 
        path: path.resolve(__dirname, "public"),
        //2.2 NOMBRE DELARCHIVO DE SALIDA
        filename:"bundle.js",
        //2.3  Ruta base de arvhicos estaticos 
        publicPath:"/"
    },
    //3. servidor de desarrollo 
    devServer: { 
        //3.1folder estatico 
        static: path.join(__dirname, "public"),
        //3.2 puerto del servidor 
        port:808,
        //3.3 definiedo el host 
        host: "0.0.0.0"
    }
}