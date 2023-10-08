/* eslint-disable no-unused-vars */
// Cargando dependencias
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('dwpcii:server');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Creando la instancia de express
const app = express();

// Configurando el motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Se establecen los middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
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

// app.get('/about/tec', function(req, res, next) {
// Genera una imagen aleatoria del Instituto
// var tecImages = ['imagen1.jpg', 'imagen2.jpg', 'imagen3.jpg'];
// var randomImage = tecImages[Math.floor(Math.random() * tecImages.length)];

// Renderiza la página HTML
// res.render('tec_info', { image: randomImage });
// });

// Ruta "/about/api/tec" (respuesta JSON)
// app.get('/about/api/tec', function(req, res, next) {
// var tecInfo = {
// name: 'Tec de Gustavo A Madero',
// description: 'algo',
// mission: '...',
// values: '',
//  image: 'imagen aleatoria del tec'
// };

// res.json(tecInfo);
// });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
