
exports.up = function(knex) {
  return knex.schema
    .createTable("plants", tbl => {
        tbl.increments('plant_id');
        tbl.string("plant_name", 128).notNullable().unique();
        tbl.integer("user_id")
            .unsigned()
            .references("users.users_id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
            .defaultTo(1);
            
        tbl.string("h2o-frequency").notNullable()
        tbl.string("species").notNullable()
    })
    .createTable("users", tbl => {
        tbl.increments('user_id');
        tbl.string("username", 128).notNullable().unique();
        tbl.string("password", 256).notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("plants");
};
