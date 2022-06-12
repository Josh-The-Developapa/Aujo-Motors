const express = require('express');
const router = express.Router();
const {
  getCars,
  pageNotFound,
  getCar,
  createCar,
  updateCar,
  deleteCar,
  updateCarPhoto,
  home,
  donate,
  buyCar,
} = require('../controllers/controllers.js');

router.get('/', home);
router.get('/cars', getCars);
router.get('/car/:carId', getCar);
router.post('/create-car', createCar);
router.put('/update-car/:carId', updateCar);
router.delete('/delete-car/:carId', deleteCar);
router.put('/car-photo/:carId', updateCarPhoto);
router.post('/v1/create-checkout-session', donate)
router.post("/v1/buy-car/:id", buyCar)
router.get('*', pageNotFound);


module.exports = router;
