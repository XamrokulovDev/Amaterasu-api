const { Router } = require('express');
const router = Router();

const {
    getAllAuthor,
    getSingleAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor
} = require('../controllers/author.controller');

const {
    createAuthorValidator,
    updateAuthorValidator
} = require('../validators/author.validate');

router.get('/', getAllAuthor);
router.get('/:id', getSingleAuthor);
router.post('/', createAuthorValidator, createAuthor);
router.put('/:id', updateAuthorValidator, updateAuthor);
router.delete('/:id', deleteAuthor);

module.exports = router;