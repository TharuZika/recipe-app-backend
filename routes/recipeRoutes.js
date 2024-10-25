const express = require('express');
const { getRecipesById, getRecipesByCategory, addFavoriteRecipe, removeFavoriteRecipe, getFavoriteRecipes, getCategories } = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/recipes/category/:category', getRecipesByCategory);
router.get('/recipes/categories', getCategories);
router.get('/recipes/find/:id', getRecipesById);
router.post('/recipes/favorites', authMiddleware, addFavoriteRecipe);
router.post('/recipes/favorites/delete', authMiddleware, removeFavoriteRecipe);
router.get('/recipes/favorites', authMiddleware, getFavoriteRecipes);

module.exports = router;
