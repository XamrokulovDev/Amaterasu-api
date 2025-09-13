const { Router } = require('express');
const router = Router();

const {
    getAllParts,
    createPart,
    updatePart,
    deletePart,
} = require('../controllers/part.controller');

const {
    createPartValidator,
    updatePartValidator
} = require('../validators/part.validate');

const upload = require("../utils/upload");

router.get('/', getAllParts);
router.post('/', upload.single("video"), createPartValidator, createPart);
router.put('/:id', upload.single("video"), updatePartValidator, updatePart);
router.delete('/:id', deletePart);

module.exports = router;