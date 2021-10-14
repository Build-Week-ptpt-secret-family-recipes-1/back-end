// Update with your config settings.
const common = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' },
  pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
  connection: { filename: './data/familyRecipes.db3'}
}

module.exports = {

  development: {
    ...common,
  },

  staging: {
    // ...common,
    // connection: {
    //   database: 'my_db',
    //   user:     'username',
    //   password: 'password'
    // },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
  },

  production: {
    ...common,
  },

  testing: {
    ...common,
    connection: { filename: './data/test.db3' }
  }

};
