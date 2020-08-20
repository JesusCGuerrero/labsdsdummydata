const knex = require("knex");

const knexfile = require("../knexfile");

let environment
// console.log(NODE_ENV)

if (process.env.NODE_ENV === undefined || process.env.NODE_ENV === "undefined" || !process.env.NODE_ENV) {
    environment = "development"
} else {
    environment = "production"
}

module.exports = knex(knexfile[environment])