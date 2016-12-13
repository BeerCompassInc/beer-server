
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('mapData').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('mapData').insert({id: 1, user_id: 1, adventure_id: 1, lat: '-41.296798', lng: '174.773789', time: '2'}),
        knex('mapData').insert({id: 2, user_id: 1, adventure_id: 1, lat: '-41.296478', lng: '174.773951', time: '2'}),
        knex('mapData').insert({id: 3, user_id: 1, adventure_id: 1, lat: '-41.296139', lng: '174.774068', time: '2'}),
        knex('mapData').insert({id: 4, user_id: 1, adventure_id: 1, lat: '-41.295919', lng: '174.774277', time: '2'}),
        knex('mapData').insert({id: 5, user_id: 1, adventure_id: 1, lat: '-41.295036', lng: '174.774760', time: '2'})
      ])
    })
}
