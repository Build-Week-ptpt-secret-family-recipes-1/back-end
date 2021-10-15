
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {
          recipeName: 'Chocolate Chip Cookies',
          by: 'Grandma',
          description: 'Best Chocolate Chip Cookies ever!',
          prep: '15 min',
          total: '40 min',
          servings: '6',
          yield: '12 cookies',
          nutritionInfo: 'not super healthy',
          ingredients: 'flour, eggs, sugar, chocolate chips'
      }

      ]);
    });
};
