const { Router } = require('express');
const router = Router();

const {
    getAllAnime,
    createAnime,
    deleteAnime,
} = require('../controllers/anime.controller');
const { createAnimeValidator } = require('../validators/anime.validate');
const upload = require("../utils/upload");

// Routes
router.get('/', getAllAnime);
router.post('/', upload.single("image"), createAnimeValidator, createAnime);
router.delete('/:id', deleteAnime);

module.exports = router;