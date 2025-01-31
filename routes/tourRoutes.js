const express = require('express');
const tourControllers = require('./../controllers/tourControllers');
const authControllers = require('./../controllers/authController');
const catchAsync = require('./../utils/catchAsync');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourControllers.aliasTopTours, catchAsync(tourControllers.getAllTours));

router.route('/tour-stats').get(catchAsync(tourControllers.getTourStats));

router
  .route('/monthly-plan/:year')
  .get(
    catchAsync(authControllers.protect),
    authControllers.restrictTo('admin', 'lead-guide','guide'),
    catchAsync(tourControllers.getMonthlyPlan)
  );

router
  .route('/:id')
  .get(catchAsync(tourControllers.getTour))
  .patch(
    catchAsync(authControllers.protect),
    authControllers.restrictTo('admin', 'lead-guide'),
    tourControllers.uploadTourImages,
    catchAsync(tourControllers.resizeTourImages),
    catchAsync(tourControllers.updateTour)
  )
  .delete(
    catchAsync(authControllers.protect),
    authControllers.restrictTo('admin', 'lead-guide'),
    catchAsync(tourControllers.deleteTour)
  );

router
  .route('/')
  .get(catchAsync(tourControllers.getAllTours))
  .post(
    catchAsync(authControllers.protect),
    authControllers.restrictTo('admin', 'lead-guide'),
    catchAsync(tourControllers.postTour)
  );

module.exports = router;
