
exports.seed = function(knex) {
  const user = [
    {
      name: "user",
      password: '456123'
    },
    {
      plant_name: "peashooter",
      password: 'zombie'
    }
  ];

  return knex("users")
    .insert(user)
    .then(() => console.log("\n== Seed data for plants table added. ==\n"));
};
