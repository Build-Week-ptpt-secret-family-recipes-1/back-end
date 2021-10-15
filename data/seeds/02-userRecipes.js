
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('userRecipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('userRecipes').insert([
        {userId: 1, recipeId: 1}
      ]);
    });
};
