exports.getRecipesByCategory = async (req, res) => {
    const { category } = req.params;
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      res.json(response.data.meals);
    } catch (err) {
      res.status(500).json({ msg: 'Error fetching recipes' });
    }
  };
  
  // Add/Remove favorite recipes (extend as needed)
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