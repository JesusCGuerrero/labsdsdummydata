const db = require('../data/dbConfig')

function getData() {
    return db('ds_string')
}

function addData(newData) {
    return db('ds_string').insert(newData)
}

module.exports = {
    getData,
    addData
}