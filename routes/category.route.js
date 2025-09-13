const { Router } = require('express');
const router = Router();

const {
    getAllCategory,
    getSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category.controller');

const {
    createCategoryValidator,
    updateCategoryValidator
} = require('../validators/category.validate');

router.get('/', getAllCategory);
router.get('/:id', getSingleCategory);
router.post('/', createCategoryValidator, createCategory);
router.put('/:id', updateCategoryValidator, updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;