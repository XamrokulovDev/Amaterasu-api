const asyncHandler = require('../middlewares/async');
const ErrorHandler = require('../middlewares/error');
const { validationResult } = require('express-validator');
const Studio = require('../models/studio.model');

// @desc get all studios
// @route GET /api/v1/studio
// @access public
exports.getAllStudio = asyncHandler(async (req, res, next) => {
  const studios = await Studio.find();

  if (!studios) {
    return next(new ErrorHandler('Hech qanday ma\'lumot topilmadi!', 404));
  }

  res.status(200).json({
    success: true,
    count: studios.length,
    data: studios,
  });
});

// @desc get single studio
// @route GET /api/v1/studio/:id
// @access public
exports.getSingleStudio = asyncHandler(async (req, res, next) => {
  const studio = await Studio.findById(req.params.id);

  if (!studio) {
    return next(new ErrorHandler('Ma\'lumot topilmadi!', 404));
  }

  res.status(200).json({
    success: true,
    data: studio,
  });
});

// @desc create studio
// @route POST /api/v1/studio
// @access private
exports.createStudio = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorHandler(errors.array()[0].msg, 400));
  }

  const { title } = req.body;

  const studio = await Studio.create({ title });

  res.status(201).json({
    success: true,
    data: studio,
  });
});

// @desc update studio
// @route PUT /api/v1/studio/:id
// @access private
exports.updateStudio = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorHandler(errors.array()[0].msg, 400));
  }

  let studio = await Studio.findById(req.params.id);

  if (!studio) {
    return next(new ErrorHandler('Ma\'lumot topilmadi!', 404));
  }

  const { title } = req.body;

  studio = await Studio.findByIdAndUpdate(
    req.params.id,
    { title },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: studio,
  });
});

// @desc delete studio
// @route DELETE /api/v1/studio/:id
// @access private
exports.deleteStudio = asyncHandler(async (req, res, next) => {
  const studio = await Studio.findByIdAndDelete(req.params.id);

  if (!studio) {
    return next(new ErrorHandler('Ma\'lumot topilmadi!', 404));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});