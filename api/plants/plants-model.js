const db = require('../../data/connection')

function getAll() {
    return db('plants')
}

const add = async ({ nickname, species, h2o_frequency, image_url, user_id}) => {
    await db('plants').insert({
        nickname: nickname,
        species: species,
        h2o_frequency: h2o_frequency,
        image_url: image_url,
        user_id: user_id
    })
}

function findById(plant_id) {
    return db('plants as p')
        .select('p.plant_id', 'p.nickname', 'p.species', 'p.h2o_frequency', 'p.image_url')
        .where('p.plant_id', plant_id)
        .first()
}

module.exports = {
    getAll,
    add,
    findById,
}