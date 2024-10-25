const { default: axios } = require("axios");
const User = require("../models/User");

exports.getRecipesByCategory = async (req, res) => {
    const { category } = req.params;
    try {
      const response = await axios.get(
        process.env.THEMEALDB_URL+`filter.php?c=${category}`
      );
      res.json({flag: true, data: response.data.meals});
    } catch (err) {
      console.log(err);
      res.status(500).json({ flag: false, msg: 'Error fetching recipes' });
    }
  };

  exports.getCategories = async (req, res) => {
    try {
      const response = await axios.get(
        process.env.THEMEALDB_URL+`categories.php`
      );
      // console.log(resposne.data);
      res.json({flag: true, data: response.data});
    } catch (err) {
      console.log(err);
      res.status(500).json({ flag: false, msg: 'Error fetching categories' });
    }
  };

  exports.getRecipesById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await axios.get(
        process.env.THEMEALDB_URL+`lookup.php?i=${id}`
      );
  
      console.log(response);
  
      if (response.data.meals && response.data.meals.length > 0) {
        res.json({ flag: true, data: response.data.meals[0] });
      } else {
        res.json({ flag: true, data: [] });
      }
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ flag: false, msg: 'Error fetching recipes' });
    }
  };
  
  
  exports.addFavoriteRecipe = async (req, res) => {
    const { recipeId } = req.body;
    try {
      const user = await User.findById(req.user.userId);
      if (!user.favoriteRecipes.includes(recipeId)) {
        user.favoriteRecipes.push(recipeId);
        await user.save();
        res.json({ msg: 'Recipe added to favorites' });
      } else {
        res.json({ msg: 'Recipe already in favorites' });
      }
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
  exports.removeFavoriteRecipe = async (req, res) => {
    const { recipeId } = req.body;
    try {
      const user = await User.findById(req.user.userId);
      user.favoriteRecipes = user.favoriteRecipes.filter((id) => id !== recipeId);
      await user.save();
      res.json({ msg: 'Recipe removed from favorites' });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  };

  exports.getFavoriteRecipes = async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).populate('favoriteRecipes');
      const favMeals = [];
      for (const meal of user.favoriteRecipes) {
        const mealId = meal;
        const response = await axios.get(process.env.THEMEALDB_URL+`lookup.php?i=${mealId}`);
        if (response.data.meals) {
          favMeals.push(response.data.meals[0]);
        }
      }
      
      res.json({ favoriteRecipes: favMeals });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Error when getting favorites' });
    }
  };
  