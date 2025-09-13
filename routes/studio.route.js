const { Router } = require('express');
const router = Router();

const {
    getAllStudio,
    getSingleStudio,
    createStudio,
    updateStudio,
    deleteStudio
} = require('../controllers/studio.controller');

const {
    createStudioValidator,
    updateStudioValidator
} = require('../validators/studio.validate');

router.get('/', getAllStudio);
router.get('/:id', getSingleStudio);
router.post('/', createStudioValidator, createStudio);
router.put('/:id', updateStudioValidator, updateStudio);
router.delete('/:id', deleteStudio);

module.exports = router;