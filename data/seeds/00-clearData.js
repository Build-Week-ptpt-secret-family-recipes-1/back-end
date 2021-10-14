
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {userId: 1, username: 'dCrockett', password: '1234'},
        {userId: 2, username: 'pBill', password: '1234'},
        {userId: 3, username: 'jHenry', password: '1234'}
      ]);
    });
};
