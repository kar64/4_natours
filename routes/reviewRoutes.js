const express = require('express');
const authControllers = require('./../controllers/authController');
const catchAsync = require('./../utils/catchAsync');

const reviewControllers = require('./../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router.use(catchAsync(authControllers.protect));

router
  .route('/')
  .get(catchAsync(reviewControllers.getAllReviews))
  .post(
    authControllers.restrictTo('user'),
    reviewControllers.setTourUserId,
    catchAsync(reviewControllers.createReview)
  );

router
  .route('/:id')
  .delete(authControllers.restrictTo('user','admin'),catchAsync(reviewControllers.deleteReview))
  .patch(authControllers.restrictTo('user','admin'),catchAsync(reviewControllers.updateReview))
  .get(catchAsync(reviewControllers.getReview));

module.exports = router;
