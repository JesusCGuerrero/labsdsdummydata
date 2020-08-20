const db = require('../data/dbConfig')

function getUsers() {
    return db('user')
}

function getUserById(id) {
    return db('user')
        .where({ 'user.id': id })
}

function register(newUser) {
    return db('user').insert(newUser)
}

function login(username){
    return db('user').where({username: username})
}

function removeUser(id) {
    return db('user')
        .where('user.id', id)
        .del()
}

function editUser(id, changes) {
    return db('user')
    .where({ 'user.id': id})
    .update(changes);
}

module.exports = {
    getUsers,
    getUserById,
    register,
    login,
    removeUser,
    editUser
}