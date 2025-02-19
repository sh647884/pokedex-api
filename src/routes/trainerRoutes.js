const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, trainerController.create);
router.get('/', authenticateToken, trainerController.get);
router.put('/', authenticateToken, trainerController.update);
router.delete('/', authenticateToken, trainerController.delete);
router.post('/mark', authenticateToken, trainerController.markPokemon);

module.exports = router;