 const jwt = require('jsonwebtoken')
 const { JWT_SECRET } = require('../CONFIG')

 module.exports = (req, res, next) => {
     const token = req.headers.authorization

     if(!token) {
         return next({status: 401, message: `token needed`})
     }

     jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
         if(err){
             return next({ status: 401, message: `bad token ${err.message}` })
         }

         req.decodedToken = decodedToken
         return next()
     })
 };