
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('mapData').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('mapData').insert({id: 1, user_id: 1, adventure_id: 1, lat: '-41.296798', lng: '174.773789'}),
        knex('mapData').insert({id: 2, user_id: 1, adventure_id: 1, lat: '-41.296478', lng: '174.773951'}),
        knex('mapData').insert({id: 3, user_id: 1, adventure_id: 1, lat: '-41.296139', lng: '174.774068'}),
        knex('mapData').insert({id: 4, user_id: 1, adventure_id: 1, lat: '-41.295919', lng: '174.774277'}),
        knex('mapData').insert({id: 5, user_id: 1, adventure_id: 1, lat: '-41.295036', lng: '174.774760'}),
        knex('mapData').insert({id: 6, user_id: 1, adventure_id: 1, lat: '-41.294732', lng: '174.774983'}),
        knex('mapData').insert({id: 7, user_id: 1, adventure_id: 1, lat: '-41.294044', lng: '174.775336'}),
        knex('mapData').insert({id: 8, user_id: 1, adventure_id: 1, lat: '-41.293070', lng: '174.775768'}),
        knex('mapData').insert({id: 9, user_id: 1, adventure_id: 1, lat: '-41.292740', lng: '174.776060'}),
        knex('mapData').insert({id: 10, user_id: 1, adventure_id: 1, lat: '-41.292261', lng: '174.776296'})
      ])
    })
}
