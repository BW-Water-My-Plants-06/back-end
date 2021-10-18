 const jwt = require('jsonwebtoken')
 const { JWT_SECRET } = require('../CONFIG')
 const Plants = require('../users/users-model')

const restricted = (req, res, next) => {
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

 async function checkPlantId(req, res, next) {
    try {
      const plantMaybe = await Plants.findPlantById(req.params.plant_id)
      if (plantMaybe) {
        req.plant = plantMaybe
        next()
      } else {
        next({ status: 404, message: 'not found!!!' })
      }
    } catch (error) {
      next(error)
    }
  }

 module.exports = {
    restricted,
    checkPlantId
 }