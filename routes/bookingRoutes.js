const express = require('express');
// const authControllers = require('./../controllers/authController');
const catchAsync = require('./../utils/catchAsync');

const bookingControllers = require('./../controllers/bookingController');
const authControllers = require('./../controllers/authController');

const router = express.Router();

router
.get('/checkout-session/:tourId',catchAsync(authControllers.protect),catchAsync(bookingControllers.getCheckoutSession))

// router.use(authControllers.restrictTo('user','admin'));

router
  .route('/')
  .get(bookingControllers.getAllBookings)
  .post(bookingControllers.createBooking);

router
  .route('/:id')
  .get(bookingControllers.getBooking)
  .patch(bookingControllers.updateBooking)
  .delete(bookingControllers.deleteBooking);

module.exports = router;
