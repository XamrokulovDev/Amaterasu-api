const { Router } = require('express');
const router = Router();

const {
    getAllEpisodes,
    createEpisode,
} = require('../controllers/episode.controller');

const {
    createEpisodeValidator
} = require('../validators/episode.validate');

router.get('/', getAllEpisodes);
router.post('/', createEpisodeValidator, createEpisode);

module.exports = router;