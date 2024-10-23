const express = require('express');
const { getRecipesByCategory, addFavoriteRecipe, removeFavoriteRecipe } = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/recipes/:category', getRecipesByCategory);
router.post('/recipes/favorites', authMiddleware, addFavoriteRecipe);
router.delete('/recipes/favorites', authMiddleware, removeFavoriteRecipe);

module.exports = router;