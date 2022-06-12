const Car = require('../models/Cars.js');
const ErrorResponse = require('../Utils/errorResponse.js');
const path = require('path')
const stripe = require('stripe')('sk_test_51JJGl0FoXys89NW04r4hH2267S50MXfFvo5fjbpt9r9fLjbF8EhSIQ4zotZimfKiDv3Wch2ckzz5Fr0kKZqHLFq800QGBKCc1k');
const domain = 'http://localhost:3000';

module.exports.getCars = async (req, res, next) => {
  const cars = await Car.find();

  if (!cars) {
    return next(new ErrorResponse("No cars found"))
  }

  res.json({
    cars: cars
  })
}

module.exports.pageNotFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: '404 Page Not Found',
  });
};

module.exports.getCar = async (req, res, next) => {
  try {
    const carId = req.params.carId;

    const car = await Car.findById(carId).select('+publishDate');
    if (!car) {
      return next(
        new ErrorResponse(`Car not found with id of ${ req.params.carId }`, 404)
      );
    }

    res.json({
      sucess: true,
      car,
    });
  } catch (err) {
    next(new ErrorResponse(`Car not found with id of ${ req.params.carId }`, 404))
  }
};

module.exports.createCar = async (req, res, next) => {
  try {
    const name = req.body.name;
    const price = req.body.price;
    if (!name && !price) {
      return next(new ErrorResponse('Please enter a name and price for your product', 404));
    }
    if (!price) {
      return next(
        new ErrorResponse('Please enter a price for your product', 404)
      );
    }

    if (!name) {
      return next(
        new ErrorResponse('Please enter a price for your product', 404)
      );
    }


    const car = await Car.create({
      name: name,
      price: price
    });
    console.log(car)
    res.json({
      success: true,
      car,
    });
  } catch (err) {
    next(err)
  }
};

module.exports.updateCar = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return next(new ErrorResponse('Please enter a name or price for your product', 400))
    }

    const car = await Car.findById(req.params.carId);

    if (!car) {
      return next(
        new ErrorResponse(`No car with id of ${ req.params.carId } found`, 404)
      );
    }

    let updatedCar

    if (name && !price) {
      updatedCar = Car.findByIdAndUpdate(
        req.params.carId,
        name,
        {
          new: true,
        }
      );
    } else if (price && !name) {
      updatedCar = Car.findByIdAndUpdate(
        req.params.carId,
        price,
        {
          new: true,
        }
      );
    }

    res.json({
      success: true,
      updatedCar,
    });
  } catch (err) {
    next(err)
  }
};

module.exports.deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.carId);
    if (!car) {
      return next(
        new ErrorResponse(`Car not found with id of ${ req.params.carId }`, 404)
      );
    }
    await Car.findByIdAndDelete(req.params.carId);
    res.json({
      success: true,
      message: 'Car successfully deleted',
    });
  } catch (err) {
    next(err)
  }
};

module.exports.updateCarPhoto = async (req, res, next) => {
  const car = await Car.findById(req.params.carId)

  if (!car) {
    return next(new ErrorResponse(`Car not found with id of ${ req.params.id }`, 404))
  }

  if (!req.files) {
    return next(new ErrorResponse('Please upload a file', 400))
  }
  let carPhoto = req.files.carPhoto

  if (!carPhoto.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Please upload an image', 400))
  }
  if (carPhoto.size > 10000000) {
    return next(new ErrorResponse('File too big to upload', 400))
  }
  carPhoto.name = `carPhoto_${ car._id }${ path.parse(carPhoto.name).ext }`

  carPhoto.mv(`${ process.env.FILE_UPLOAD_PATH }/${ carPhoto.name }`, async (err) => {
    if (err) {
      return next(new ErrorResponse('Problem with file Upload', 500))
    }
  })

  await Car.findByIdAndUpdate(req.params.carId, { photo: carPhoto.name })

  res.status(200).json({
    success: true,
    data: carPhoto.name
  })
  console.log(carPhoto)
};

module.exports.home = (req, res) => {
  res.redirect('/cars');
};

module.exports.donate = async function (req, res, next) {
  const session = await stripe.checkout.sessions.create({
    submit_type: 'donate',
    line_items: [
      {
        price: "price_1L9lwMFoXys89NW0whA8RF0F",
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${ domain }?success=true`,
    cancel_url: `${ domain }?canceled=true`,
  });

  res.redirect(303, session.url);
}

module.exports.buyCar = async function (req, res, next) {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(new ErrorResponse("No car Found"), 404);
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: car.stripe,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${ domain }?success=true`,
    cancel_url: `${ domain }?canceled=true`,
  });

  res.redirect(303, session.url);
}
