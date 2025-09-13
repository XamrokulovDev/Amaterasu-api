const { body } = require("express-validator");

exports.createPartValidator = [
  body("anime_id")
    .notEmpty().withMessage("Anime ID kiritilishi shart!")
    .isMongoId().withMessage("Anime ID noto‘g‘ri formatda!"),

  body("part_number")
    .notEmpty().withMessage("Qism raqami bo'sh bo‘lishi mumkin emas!")
    .isInt({ min: 1 }).withMessage("Qism raqami musbat butun son bo‘lishi kerak!")
];

exports.updatePartValidator = [
  body("anime_id")
    .optional()
    .isMongoId().withMessage("Anime ID noto‘g‘ri formatda!"),

  body("part_number")
    .optional()
    .isInt({ min: 1 }).withMessage("Qism raqami musbat butun son bo‘lishi kerak!")
];