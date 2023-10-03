// Cargando dependencias
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug')('dwpcii:server');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Setting Webpack Modules
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
// Importing webpack configuration
import webpackConfig from '../webpack.dev.config';

// Creando la instancia de express
var app = express();

// Get the execution mode
const nodeEnviroment = process.env.NODE_ENV || 'production'

// Deciding if we add webpack middleware or not
if(nodeEnviroment === 'development'){
  // Start Webpack dev server
  console.log("🛠️  Ejecutando en modo desarrollo");
  // Adding the key "mode" with its value "development"
  webpackConfig.mode = nodeEnviroment;
  // Setting the dev server port to the same value as the express server
  webpackConfig.devServer.port = process.env.PORT;
  // Setting up the HMR (Hot Module Replacement)
  webpackConfig.entry = [
    "webpack-hot-middleware/client?reload=true&timeout=1000",
    webpackConfig.entry
  ];
	// Agregar el plugin a la configuración de desarrollo
  // de webpack
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Creating the bundler
  const bundle = webpack(webpackConfig);
  // Enabling the webpack middleware
  app.use( WebpackDevMiddleware(bundle, {
    publicPath: webpackConfig.output.publicPath
  }) );
  //  Enabling the webpack HMR
  app.use( WebpackHotMiddleware(bundle) );
}else{
  console.log("🏭 Ejecutando en modo producción 🏭");
}

// Configurando el motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Se establecen los middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Crea un server de archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Registro de Middlewares de aplicación
app.use('/', indexRouter);
// Activa "usersRourter" cuando se
// solicita "/users"
app.use('/users', usersRouter);
// app.use('/author', (req, res)=>{
//   res.json({mainDeveloper: "Ivan Rivalcoba"})
// });

//app.get('/about/tec', function(req, res, next) {
  // Genera una imagen aleatoria del Instituto
  //var tecImages = ['imagen1.jpg', 'imagen2.jpg', 'imagen3.jpg'];
  //var randomImage = tecImages[Math.floor(Math.random() * tecImages.length)];

  // Renderiza la página HTML
  //res.render('tec_info', { image: randomImage });
//});

// Ruta "/about/api/tec" (respuesta JSON)
//app.get('/about/api/tec', function(req, res, next) {
   //var tecInfo = {
       //name: 'Tec de Gustavo A Madero',
       //description: 'algo',
       //mission: '...',
       //values: '',
     //  image: 'imagen aleatoria del tec'
   //};

  // res.json(tecInfo);
//});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;