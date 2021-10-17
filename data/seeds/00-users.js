
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex('users').truncate()
  return knex('users').del()
  // return knex.raw('TRUNCATE TABLE users CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          // userId: 1,
          username: 'dCrockett',
          password: '1234', 
          first_name: 'Davey', 
          last_name: 'Crockett', 
          email: 'dcrockett@dontusethis.com'
        },
        {
          // userId: 2, 
          username: 'pBill', 
          password: '1234', 
          first_name: 'Pecos',
          last_name: 'Bill', 
          email: 'pBill@dontusethis.com'
        },
        {
          // userId: 3, 
          username: 'jHenry', 
          password: '1234', 
          first_name: 'John',
          last_name: 'Henry',
          email: 'jHenry@dontusethis.com'
        }
      ]);
    });
};
