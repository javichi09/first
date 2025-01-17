// Cargando dependencias
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';

// Setting Webpack Modules
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

// Importing template-engine
import configTemplateEngine from './config/templateEngine';

// Importing webpack configuration
import webpackConfig from '../webpack.dev.config';

// Impornting winston logger
import log from './config/winston';

// Importing Router
import router from './router';

import debug from './services/debugLogger';

// Creando variable del directorio raiz
// eslint-disable-next-line
global['__rootdir'] = path.resolve(process.cwd());

// Creando la instancia de express
const app = express();

// Get the execution mode
const nodeEnviroment = process.env.NODE_ENV || 'production';

// Deciding if we add webpack middleware or not
if (nodeEnviroment === 'development') {
  // Start Webpack dev server
  debug('🛠️ Ejecutando en modo desarrollo 🛠️');
  // Adding the key "mode" with its value "development"
  webpackConfig.mode = nodeEnviroment;
  // Setting the dev server port to the same value as the express server
  webpackConfig.devServer.port = process.env.PORT;
  // Setting up the HMR (Hot Module Replacement)
  webpackConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    webpackConfig.entry,
  ];
  // Agregar el plugin a la configuración de desarrollo
  // de webpack
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Creating the bundler
  const bundle = webpack(webpackConfig);
  // Enabling the webpack middleware
  app.use(
    WebpackDevMiddleware(bundle, {
      publicPath: webpackConfig.output.publicPath,
    }),
  );
  //  Enabling the webpack HMR
  app.use(WebpackHotMiddleware(bundle));
} else {
  console.log('🏭 Ejecutando en modo producción 🏭');
}

// Configuring the template engine
configTemplateEngine(app);

// Database Connetion Checker
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    log.info('✔ verificacion de conexicion a db exitosa');
    next();
  } else {
    res.status(503).render('error/e503View', { layout: 'error' });
  }
});
// Se establecen los middlewares
app.use(morgan('dev', { stream: log.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Crea un server de archivos estaticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Registro de Rutas
router.addRoutes(app);

export default app;
