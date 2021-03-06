// Update with your config settings.
const pgConnection = process.env.DATABASE_URL

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true, 
    connection: {
      filename: './dev.db3',
    },
    // needed when using foreign keys
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
      },
    },
  },

  production: {
    client: "pg",
    useNullAsDefault: true,
    connection: pgConnection,
    pool: {min: 2, max: 10},
    migrations: {
        directory: "./migrations",
    },
    seeds: {
        directory: "./seeds",
    },
},
};