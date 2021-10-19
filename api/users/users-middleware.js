const Users = require('./users-model')

const checkId = async (req, res, next) => {
    const { id } = req.params
    const check = await Users.findUserById(id)
    !check ? res.status(404).json({message: 'User not found'}) : next()
}

const checkBody = (req, res, next) => {
    const { username, password, phone_number } = req.body
    !username || !password || !phone_number ? res.status(401).josn({
        message: 'Username, Phone Number, and Password are required' 
    }) : next()
}

module.exports = {
    checkId,
    checkBody
}