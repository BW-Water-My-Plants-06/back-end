const router = require("express").Router();

const Plants = require("./users-model.js");
const {restricted, checkPlantId} = require("../auth/restricted-middelware.js");

router.get("/", restricted, (req, res, next) => {
    Plants.getPlants()
        .then(plants => {
            res.json(plants);
        })
        .catch(next);
})

router.get("/:user_id", restricted, checkPlantId, (req, res, next) => {
    Plants.findPlantById(req.params.user_id)
        .then(plant => {
            res.json(plant);
        })
        .catch(next);
})

router.post("/", restricted, async (req, res, next) => {
    try{
    const inserted = await Plants.addPlant(req.body)
    res.status(201).json(inserted)
}catch(err) {
    next(err)
}
})

router.put("/:plant_id", restricted, checkPlantId, (req, res, next) => {
    Plants.update(req.params.plant_id, req.body)
        .then(plant => {
            res.status(200).json(plant);
        })
        .catch(next);
})

router.delete("/:plant_id", restricted, checkPlantId, (req, res, next) => {
    Plants.remove(req.params.plant_id)
        .then(() => {
            res.status(200).json({ message: 'plant has been mowed' });
        })
        .catch(next);
})

module.exports = router;