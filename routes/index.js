var express = require('express');
var router = express.Router();

//FUNCION DE ALEATORIA DE IMAGENES 
function selecctionImagen(image){
 var randomIndex = Math.floor(Math.random() * image.length);
  return image[randomIndex];
}

//imagenes
var image = ['../public/images/imagen1.jpg', '../public/images/imagen2.jpg', '../public/images/imagen3.jpg'];

// GET /
router.get('/', function(req, res, next) {
res.render('index', { title: 'ITGAM', author:"Espinoza Montoya Aylen Azucena" });
});

router.get('/about/tec', function (req, res, next) {
  res.render('tec');
});

router.get('/about/api/tec', function(req, res, next) {
  var aleoImage = selecctionImagen(image);
  var tecinfo ={ 
    title: "ITGAM ALCOHENES PEREGRINOS", 
    Mission:"Formar con responsabilidad y excelencia,a profesionistas capaces de enfrentar y resolver los retos que se presentan en el ámbito nacional e internacional", 
    Values: "Respeto, Liderazgo, Responsabilidad, Perseverancia.",
    imagenes: aleoImage
};

res.json(tecinfo);
});

module.exports = router;
