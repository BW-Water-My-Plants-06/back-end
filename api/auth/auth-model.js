const db = require('../../data/connection')

const findById = (id) => {
    return db('users').where('user_id', id).first()
}

const findByUn = (username) => {
    return db('users').where('username', username).first()
}

const addUser = async ({ username, password, phone_number }) => {
    await db('users').insert({
        username: username,
        password: password,
        phone_number: phone_number
    })
}

module.exports = {
    addUser,
    findById,
    findByUn
}