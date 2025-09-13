const { body } = require("express-validator");

exports.createEpisodeValidator = [
  body("title")
    .notEmpty().withMessage("Episod nomi bo'sh bo‘lishi mumkin emas!")
    .isLength({ min: 3 }).withMessage("Episod nomi kamida 3 ta belgidan iborat bo‘lishi kerak!"),

  body("episode_number")
    .notEmpty().withMessage("Episod raqami bo'sh bo‘lishi mumkin emas!")
    .isInt({ min: 1 }).withMessage("Episod raqami faqat musbat raqam bo‘lishi kerak!")
];