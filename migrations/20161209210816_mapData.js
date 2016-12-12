
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('mapData', (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.integer('adventure_id')
    table.string('lat')
    table.string('lng')
    table.integer('time')
    table.timestamp('createdAt').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('mapData')
}
