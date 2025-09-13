const { body } = require('express-validator');

exports.createAnimeValidator = [
    body('title')
        .notEmpty().withMessage("Sarlavha bo'sh bo'lishi mumkin emas!")
        .isLength({ min: 3 }).withMessage("Sarlavha kamida 3 ta belgidan iborat bo‘lishi kerak!"),

    body('description')
        .notEmpty().withMessage("Tavsif bo'sh bo'lishi mumkin emas!")
        .isLength({ min: 10 }).withMessage("Tavsif kamida 10 ta belgidan iborat bo‘lishi kerak!"),

    body('ranking')
        .notEmpty().withMessage("Reyting bo'sh bo'lishi mumkin emas!")
        .isNumeric().withMessage("Reyting faqat raqamlardan iborat bo‘lishi kerak!"),

    body('year')
        .notEmpty().withMessage("Yil bo'sh bo'lishi mumkin emas!")
        .isInt({ min: 1900, max: new Date().getFullYear() })
        .withMessage(`Yil 1900 va ${new Date().getFullYear()} orasida bo‘lishi kerak!`),

    body('author')
        .notEmpty().withMessage("Muallif tanlanishi shart!")
        .isMongoId().withMessage("Muallif ID noto‘g‘ri!"),

    body('isPremium')
        .optional()
        .isBoolean().withMessage("Premium qiymati true yoki false bo‘lishi kerak!"),
];