
exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments('userId'),
      table.string('username').notNullable().unique(),
      table.string('password').notNullable()
  })
  .createTable('recipes', recipe => {
      recipe.increments('recipeId'),
      recipe.string('recipeName').notNullable(),
      recipe.string('by').notNullable(),
      recipe.string('description').notNullable(),
      recipe.string('prep').notNullable(),
      recipe.string('total').notNullable(),
      recipe.string('servings').notNullable(),
      recipe.string('yield').notNullable(),
      recipe.string('nutritionInfo').notNullable(),
      recipe.string('ingredients').notNullable()
  })

  .createTable('userRecipes', userRecipe => {
    userRecipe.increments('userRecipeId'),
    userRecipe.integer('userId')
    .unsigned()
    .notNullable()
    .references('userId')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE'),
    userRecipe.integer('recipeId')
        .unsigned()
        .notNullable()
        .references('recipeId')
        .inTable('recipes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
  })
    
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('userRecipes')
    .dropTableIfExists('recipes')
    .dropTableIfExists('users')
};
