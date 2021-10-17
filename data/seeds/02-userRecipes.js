
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex('userRecipes').truncate()
  knex.raw('TRUNCATE TABLE userRecipes CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('userRecipes').insert([
        {userId: 2, recipeId: 1},
        {userId: 3, recipeId: 2},
        {userId: 1, recipeId: 1},
        {userId: 1, recipeId: 2},

      ]);
    });
};
