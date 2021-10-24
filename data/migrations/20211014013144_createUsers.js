
exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments('userId').primary(),
      table.string('username').notNullable().unique(),
      table.string('password').notNullable(),
      table.string('first_name').notNullable(),
      table.string('last_name').notNullable(),
      table.string('email').notNullable()
  })
  .createTable('recipes', recipe => {
      recipe.increments('recipeId').primary(),
      recipe.string('recipeName').notNullable(),
      recipe.string('by').notNullable(),
      recipe.string('description').notNullable(),
      recipe.string('prep').notNullable(),
      recipe.string('total'),
      recipe.string('servings'),
      recipe.string('yield'),
      recipe.string('nutritionInfo'),
      recipe.string('ingredients').notNullable()
  })

  .createTable('userRecipes', userRecipe => {
    userRecipe.increments('userRecipeId').primary();

    userRecipe.integer('userId')
    .unsigned()
    .notNullable();
    // .references('userId')
    // .inTable('users')
    // .onDelete('CASCADE')
    // .onUpdate('CASCADE'),

    userRecipe.foreign('userId').references('userId').inTable('users');

    userRecipe.integer('recipeId')
        .unsigned()
        .notNullable();
        // .references('recipeId')
        // .inTable('recipes')
        // .onDelete('CASCADE')
        // .onUpdate('CASCADE')

    userRecipe.foreign('recipeId').references('recipeId').inTable('recipes')
  })
    
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('userRecipes')
    .dropTableIfExists('recipes')
    .dropTableIfExists('users')
};


