const asyncHandler = require('../middlewares/async');
const ErrorHandler = require('../middlewares/error');
const { validationResult } = require('express-validator');
const Category = require('../models/category.model');

// @desc get all categories
// @route GET /api/v1/category
// @access public
exports.getAllCategory = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();

  if (!categories) {
    return next(new ErrorHandler('Hech qanday ma\'lumot topilmadi!', 404));
  }

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

// @desc get single category
// @route GET /api/v1/category/:id
// @access public
exports.getSingleCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler('Ma\'lumot topilmadi!', 404));
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

// @desc create category
// @route POST /api/v1/category
// @access private
exports.createCategory = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorHandler(errors.array()[0].msg, 400));
  }

  const { title } = req.body;

  const category = await Category.create({ title });

  res.status(201).json({
    success: true,
    data: category,
  });
});

// @desc update category
// @route PUT /api/v1/category/:id
// @access private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorHandler(errors.array()[0].msg, 400));
  }

  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler('Ma\'lumot topilmadi!', 404));
  }

  const { title } = req.body;

  category = await Category.findByIdAndUpdate(
    req.params.id,
    { title },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: category,
  });
});

// @desc delete category
// @route DELETE /api/v1/category/:id
// @access private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new ErrorHandler('Ma\'lumot topilmadi!', 404));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});