// Update with your config settings.

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
    connection: {
        filename: "./dev.pg",
    },
    pool: {
        afterCreate: (conn, done) => {
            conn.run("PRAGMA foreign_keys = ON", done);
        },
    },
    migrations: {
        directory: "./migrations",
    },
    seeds: {
        directory: "./seeds",
    },
},
};