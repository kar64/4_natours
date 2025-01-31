const express = require('express');

const userControllers = require('./../controllers/userControllers');
const authControllers = require('./../controllers/authController');
const catchAsync = require('./../utils/catchAsync');

const router = express.Router();

router.post('/signup', catchAsync(authControllers.signup));
router.post('/login', catchAsync(authControllers.login));
router.get('/logout', authControllers.logout);
router.post('/forgotPassword', catchAsync(authControllers.forgotPassword));
router.get('/resetPassword/:token', catchAsync(authControllers.resetPassword));

router.use(catchAsync(authControllers.protect));

router.patch('/updateMyPassword', catchAsync(authControllers.updatePassword));
router.get('/me', userControllers.getMe, catchAsync(userControllers.getUser));
router.patch(
  '/updateMe',
  userControllers.uploadUserPhoto,
  catchAsync(userControllers.resizePhoto),
  catchAsync(userControllers.updateMe)
);
router.delete('/deleteMe', catchAsync(userControllers.deleteMe));

router.use(authControllers.restrictTo('admin'));

router
  .route('/')
  .get(catchAsync(userControllers.getAllUsers))
  .post(userControllers.postUser);

router
  .route('/:id')
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(catchAsync(userControllers.deleteUser));

module.exports = router;
