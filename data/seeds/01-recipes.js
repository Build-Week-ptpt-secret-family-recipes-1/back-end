
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex('recipes').truncate()
  return knex('recipes').del()
  // knex.raw('TRUNCATE TABLE recipes CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {
          recipeName: 'Chocolate Chip Cookies',
          by: 'Grandma',
          description: 'Best Chocolate Chip Cookies ever!',
          prep: '15 min',
          total: '30 min',
          servings: '6',
          yield: '12 cookies',
          nutritionInfo: 'not super healthy',
          ingredients: 'flour, eggs, sugar, chocolate chips'
      },
      {
        recipeName: 'Chicken Pot Pie',
        by: 'Mom',
        description: 'Classic, flaky, tender and delicious!',
        prep: '15 min',
        total: '1 hr',
        servings: '12',
        yield: '1 pie',
        nutritionInfo: 'plenty of calories and butter',
        ingredients: '4 tbsp. butter, 1/2c diced onion, 3c shredded cooked chicken, 1 large egg, 3c chicken broth,  1 unbaked pie crust'
    }

      ]);
    });
};
