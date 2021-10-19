const Auth = require('./auth-model')

const validateUniqueUser = async (req, res, next) => {
  try {
    const { username } = req.body
    const existingUser = await Auth.findByUn(username)
    if(existingUser) {
      next({ message: 'username taken' })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkBody = (req, res, next) => {
  const { username, password } = req.body
  const valid = Boolean(username && password)
  if (valid) {
    next()
  } else {
    next({
      status: 422,
      message: 'username and password reqired'
    })
  }
}

const checkBodyPhoneNumber = (req, res, next) => {
  const { username, password, phone_number } = req.body
  const valid = Boolean(username && password && phone_number)
  if (valid) {
    next()
  } else {
    next({
      status: 422,
      message: 'username, password, and phone number required'
    })
  }
}

const checkUsernameExist = async (req, res, next) => {
  try{
    const user = await Auth.findByUn(req.body.username)
    if (!user) {
      next({ status: 401,
      message: 'invalid credentials' })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  validateUniqueUser,
  checkBody,
  checkBodyPhoneNumber,
  checkUsernameExist
}