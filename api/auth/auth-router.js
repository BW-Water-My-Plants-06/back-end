const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Auth = require('./auth-model')
const tokenBuilder = require('./token-builder')

const {
    checkBody,
    checkBodyPhoneNumber,
    validateUniqueUser,
    checkUsernameExist
} = require('./auth-middelware')

router.post('/register', checkBodyPhoneNumber, validateUniqueUser, (req, res, next) => {
    const { username, password, phone_number } = req.body
    const hash = bcrypt.hashSync(password, 8)
    Auth.addUser({ username, password: hash, phone_number })
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(next)
})

router.post('/login', checkBody, checkUsernameExist, (req, res, next) => {
    if(bcrypt.compareSync(req.body.password, req.user.password)){
        const token = tokenBuilder(req.user)
        res.json({
            message: `Welcome, ${req.user.username}`,
            user_id: req.user.user_id,
            token
        })
    } else {
        next({ stauts: 401, message: 'invalid credentials' })
    }
})

module.exports = router