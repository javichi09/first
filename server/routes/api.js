import express from 'express';

const { Router } = express;

const router = Router();

// Creating the route
router.get('/author', (req, res) => {
  // Responding to the client using res object
  res.json({
    name: 'Luis Alfonso',
    lastname: 'Guzman Jimenez',
    job: 'Expendio bimbo',
  });
}); // function(req, res){}

// Exporting the router
export default router;
