const { APIFeatures } = require('../utils/APIFeatures');
const { AppError } = require('../utils/appError');

exports.deleteOne = (Model) => async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError('No doc found with that ID', 404));
  }
  // try {
  res.status(200).json({
    status: 'success',
    data: null,
  });
};

exports.updateOne = (Model) => async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(new AppError('No doc found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
};

exports.createOne = (Model) => async (req, res, next) => {
  const doc = await Model.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
};

exports.getOne = (Model, popOptions) => async (req, res, next) => {
  let query = Model.findById(req.params.id);
  if (popOptions) query = query.populate(popOptions);
  const doc = await query;

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
};

exports.getAll = (Model) => async (req, res) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const features = new APIFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .field()
    .pagination();
  const doc = await features.query;

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc,
    },
  });
};
