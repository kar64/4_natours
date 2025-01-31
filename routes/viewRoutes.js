const express = require('express');
const viewControllers = require('./../controllers/viewController');
const authControllers = require('./../controllers/authController');
const bookingControllers = require('./../controllers/bookingController');
const catchAsync = require('./../utils/catchAsync');

const router = express.Router();

router.get(
  '/',
  catchAsync(bookingControllers.createBookingCheckout),
  catchAsync(authControllers.isLoggedIn),
  catchAsync(viewControllers.getOverview)
);
router.get(
  '/tour/:id',
  catchAsync(authControllers.isLoggedIn),
  catchAsync(viewControllers.getTour)
);
router.get(
  '/login',
  catchAsync(authControllers.isLoggedIn),
  viewControllers.login
);
router.get(
  '/accaunt',
  catchAsync(authControllers.protect),
  viewControllers.userAccaunt
);
router.get(
  '/my-tours',
  catchAsync(authControllers.protect),
  catchAsync(viewControllers.getMyTours)
);

router.post(
  '/submit-user-data',
  catchAsync(authControllers.protect),
  catchAsync(viewControllers.updateUserData)
);

module.exports = router;
