require('dotenv').config();

const pg = require('pg')

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false }
}

const sharedConfig = {
  client: 'pg',
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' },
}

module.exports = {
  development: {
    ...sharedConfig,
    connection: process.env.DEV_DATABASE_URL,
  },
  testing: {
    ...sharedConfig,
    connection: process.env.TESTING_DATABASE_URL,
  },
  production: {
    ...sharedConfig,
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
  },
}


// const common = {
//   client: 'sqlite3',
//   useNullAsDefault: true,
//   migrations: { directory: './data/migrations' },
//   seeds: { directory: './data/seeds' },
//   pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
//   connection: { filename: './data/familyRecipes.db3'}
// }

// module.exports = {

//   development: {
//     ...common,
//   },

//   staging: {
//     // ...common,
//     // connection: {
//     //   database: 'my_db',
//     //   user:     'username',
//     //   password: 'password'
//     // },
//     // pool: {
//     //   min: 2,
//     //   max: 10
//     // },
//   },

//   production: {
//     ...common,
//   },

//   testing: {
//     ...common,
//     connection: { filename: './data/test.db3' }
//   }

// };
