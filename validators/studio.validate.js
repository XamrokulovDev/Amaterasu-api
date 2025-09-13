const { body } = require('express-validator');

const createStudioValidator = [
  body('title')
    .notEmpty().withMessage('Bu qatorni to‘ldiring!')
    .isString().withMessage('Bu qator string bo‘lishi kerak!')
    .isLength({ min: 2, max: 50 }).withMessage('Bu qator uzunligi 2–50 oraliqda bo‘lishi kerak!')
    .trim(),
];

const updateStudioValidator = [
  body('title')
    .optional() // yangilashda majburiy emas
    .isString().withMessage('Bu qator string bo‘lishi kerak!')
    .isLength({ min: 2, max: 50 }).withMessage('Bu qator uzunligi 2–50 oraliqda bo‘lishi kerak!')
    .trim(),
];

module.exports = {
  createStudioValidator,
  updateStudioValidator,
};