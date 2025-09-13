const asyncHandler = require('../middlewares/async');
const ErrorHandler = require('../middlewares/error');
const { validationResult } = require('express-validator');
const Author = require('../models/author.model');

// @desc get all author
// @route GET /api/v1/author
// @access public
exports.getAllAuthor = asyncHandler(async (req, res, next) => {
  const author = await Author.find();

  if (!author) {
    return next(new ErrorHandler('Hech qanday ma\'lumot topilmadi!', 404));
  }

  res.status(200).json({
    success: true,
    count: author.length,
    data: author,
  });
});

// @desc get single author
// @route GET /api/v1/author/:id
// @access public
exports.getSingleAuthor = asyncHandler(async (req, res, next) => {
    const author = await Author.findById(req.params.id);

    if (!author) {
        return next(new ErrorHandler('Ma\'lumot topilmadi!', 404));
    }

    res.status(200).json({
        success: true,
        data: author
    });
});

// @desc create author
// @route POST /api/v1/author
// @access private
exports.createAuthor = asyncHandler(async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorHandler(errors.array()[0].msg, 400));
    }

    const { title } = req.body;

    const author = await Author.create({ title });

    res.status(201).json({
        success: true,
        data: author
    });
})

// @desc update author
// @route PUT /api/v1/author/:id
// @access private
exports.updateAuthor = asyncHandler(async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorHandler(errors.array()[0].msg, 400));
    }

    let author = await Author.findById(req.params.id);

    if (!author) {
        return next(new ErrorHandler('Ma\'lumot topilmadi!', 404));
    }

    const { title } = req.body;

    author = await Author.findByIdAndUpdate(req.params.id, { title }, { new: true, runValidators: true });

    res.status(200).json({
        success: true,
        data: author
    });
});

// @desc delete author
// @route DELETE /api/v1/author/:id
// @access private
exports.deleteAuthor = asyncHandler(async (req, res, next) => {
    const author = await Author.findByIdAndDelete(req.params.id);

    if (!author) {
        return next(new ErrorHandler('Ma\'lumot topilmadi!', 404));
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});