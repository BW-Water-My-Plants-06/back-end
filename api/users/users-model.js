
const db = require("../../data/connection.js");

module.exports = {
    getPlants,
    getUsers,
    addUser,
    addPlant,
    findPlant,
    findBy,
    findUserById,
    findPlantById,
    update,
    remove,
};

function getUsers() {
    return db("users")
}

function getPlants() {
    return db("plants")
}

function findPlant(filter) {
    return db("users as u")
        .join("plants as p", "p.user_id", "=", "u.user_id")
        .select("p.user_id", "p.plant_name as plant")
        .where(filter);
}

function findBy(filter) {
    return db('users as u')
        .join("plants as p", "u.user_id", "=", "p.user_id")
        .select("u.user_id", "u.username", "p.plant_name as plant", "u.password")
        .where(filter)
}

async function addUser(user) {
    const [user_id] = await db("users").insert(user);
    return findUserById(user_id);
}

async function addPlant(plant) {
    const [plant_id] = await db("plants").insert(plant);
    return findPlantById(plant_id)
}

function findUserById(user_id) {
    return db("user as u")
        .join("plants as p", "u.user_id", "=", "p.user_id")
        .select("u.user_id", "u.username", "p.plant_name as plant")
        .where("u.user_id", user_id)
        .first();
}

function findPlantById(user_id) {
    return db("plants as p")
        .join("users as u", "u.user_id", "=", "p.user_id")
        .select("p.user_id", "p.plant_name", "u.username")
        .where('p.user_id', user_id)
        .first();
}

function update(plant_id, changes) {
    return db('plants')
        .where({ plant_id })
        .update(changes, '*');
}

function remove(plant_id) {
    return db('plants')
        .where({ plant_id })
        .del();
}