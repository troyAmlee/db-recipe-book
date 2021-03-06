const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    getEverything,
  getDishes,
  getDish,
  addDish,
  addRecipe,
  getRecipes,
  getRecipe,
  updateDish,
  updateRecipe,
  removeDish,
  removeRecipe,
};

function getEverything(){
    return db('dish')
    .join('recipe', 'dish.id', '=', 'recipe.dish_id')
    .join('steps', 'recipe.id', '=', 'steps.recipe_id')
    .join('ingredients', 'steps.ingredients_id', '=', 'ingredients.id')
}

function getDishes() {
  return db('dish');
}

function getRecipes() {
    return db('recipes')
    .join('dish', 'dish.id', '=', 'recipe.dish_id')
  }

function getDish(id) {
  return db('dish')
  .join('recipe', 'dish.id', '=', 'recipe.dish_id')
  .where('dish.id', '=', id);
}

function getRecipe(id) {
    return db('recipe')
    .where({ id: Number(id) });
  }

function addDish(dish) {
  return db('dish')
    .insert(dish)
    .then(ids => ({ id: ids[0] }));
}

function addRecipe(recipe) {
    return db('recipe')
      .insert(recipe)
      .then(ids => ({ id: ids[0] }));
  }

function updateDish(id, dish) {
  return db('dish')
    .where('id', Number(id))
    .update(dish);
}

function updateRecipe(id, recipe) {
    return db('recipe')
      .where('id', Number(id))
      .update(recipe);
  }

function removeDish(id) {
  return db('dish')
    .where('id', Number(id))
    .del();
}

function removeRecipe(id) {
    return db('recipe')
      .where('id', Number(id))
      .del();
  }
