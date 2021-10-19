const router = require("express").Router();
const Users = require("./users-model.js");
const bcrypt = require('bcryptjs')

const { checkId, checkBody } = require("./users-middleware");

router.get('/', (req, res, next) => {
    Users.getUsers()
        .then(users => {
            res.json(users)
        })
        .catch(next)
})

router.get('/:id', checkId, (req, res, next) => {
    const { id } = req.params
    Users.findUserById(id)
        .then(user => {
            res.json(user)
        })
        .catch(next)
})

router.post('/', checkBody, (req, res, next) => {
    Users.addUser(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(next)
})

router.put('/:id', checkId, checkBody, (req, res, next) => {
    const { id } = req.params
    const { username, password, phone_number } = req.body
    const hash = bcrypt.hashSync(password, 8)
    Users.editUser(id, { username, password: hash, phone_number })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(next)
})

router.delete('/:id', checkId, (req, res, next) => {
    const { id } = req.params
    Users.removeUser(id)
        .then(user => {
            res.json(user)
        })
        .catch(next)
})

module.exports = router;