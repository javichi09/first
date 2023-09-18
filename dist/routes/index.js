"use strict";

var express = require('express');
var router = express.Router();

//FUNCION DE ALEATORIA DE IMAGENES 
function selecctionImagen(image) {
  var randomIndex = Math.floor(Math.random() * image.length);
  return image[randomIndex];
}

//imagenes
var image = ['https://www.gamadero.tecnm.mx/assets/files/main/img/fondoblancoitgam.png', 'https://www.gamadero.tecnm.mx/images/Anuncios/2023/oferta%20educativa%202023_6carreras%20cuadro.jpg', 'https://www.gamadero.tecnm.mx/ideologia/ideologia.png'];

// GET /
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Pronode',
    author: "Espinoza Montoya Aylen Azucena"
  });
});
router.get('/about/tec', function (req, res, next) {
  res.render('tec');
});
router.get('/about/api/tec', function (req, res, next) {
  var aleoImage = selecctionImagen(image);
  res.render('api', {
    title: "ITGAM ALCOHENES PEREGRINOS",
    Mission: "Formar con responsabilidad y excelencia,a profesionistas capaces de enfrentar y resolver los retos que se presentan en el ámbito nacional e internacional",
    Values: "Respeto, Liderazgo, Responsabilidad, Perseverancia.",
    imagenes: aleoImage
  });
});
module.exports = router;