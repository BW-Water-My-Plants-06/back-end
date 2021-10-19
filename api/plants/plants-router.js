const router = require('express').Router();

const Plants = require('./plants-model');

router.get('/', (req, res, next) => {
    Plants.getAll()
        .then(plants => {
            res.status(200).json(plants)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params
    Plants.findById(id)
        .then(plant => {
            res.json(plant)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    const plant = req.body;
    Plants.add(plant)
        .then(newPlant => {
            res.status(201).json(newPlant)
        })
        .catch(next);
})

router.put('/:id', (req, res, next) => {
    const newplant = req.body;
    Plants.update(req.params.id, newplant)
        .then(plant => {
            res.status(200).json(plant);
        })
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Plants.deletePlant(req.params.id)
        .then(plant => {
            res.json(plant)
        })
        .catch(next)
})

module.exports = router