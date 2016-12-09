
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists("mapData", (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.string('lat')
    table.string('long')
    table.timestamps()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("mapData")
};
