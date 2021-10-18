const router = require("express").Router();

const Plants = require("./users-model.js");
const restricted = require("../auth/restricted-middelware.js");

router.get("/plants", restricted, (req, res, next) => {
    Plants.getPlants()
        .then(plants => {
            res.json(plants);
        })
        .catch(next);
})

module.exports = router;