const { AppError } = require('../utils/appError');
const Tour = require('./../models/toursModel');
const User = require('./../models/userModel');
const Booking=require('./../models/bookingModel')

exports.getOverview = async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All Tour',
    tours,
  });
};

exports.login = (req, res) => {
  res.status(200).render('login', {
    title: 'login',
  });
};
exports.updateUserData = async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.id,{
    name:req.body.name,
    email:req.body.email
  },{
    new:true,
    runValidators:true
  });
  res.status(200).render('accaunt', {
    title: 'accaunt',
    user:updatedUser
  });
};

exports.userAccaunt = (req, res) => {
  res.status(200).render('accaunt', {
    title: 'accaunt',
  });
};
exports.getMyTours = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id });

  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
};

exports.getTour = async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  res.status(200).render('tour', {
    title: tour.name,
    tour,
  });
};
