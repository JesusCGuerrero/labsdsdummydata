const db = require('../data/dbConfig')

function getData() {
    return db('ds_string')
}

module.exports = {
    getData
}