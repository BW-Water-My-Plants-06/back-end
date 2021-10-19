
const db = require("../../data/connection.js");

function getUsers() {
    return db("users")
}

const addUser = (user) => {
    return db('users').insert(user)
}

function findUserById(id) {
    return db("users").where('user_id', id).first()
}

function editUser(id, changes) {
    return db('users')
        .where('user_id', id)
        .update(changes);
}

function removeUser(id) {
    return db('users')
        .where('user_id', id)
        .del();
}

module.exports = {
    getUsers,
    addUser,
    findUserById,
    editUser,
    removeUser,
};