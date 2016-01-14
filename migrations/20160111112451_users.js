
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
  	table.increments();
  	table.integer('ID');
  	table.string('NAME');
  	table.string('EMAIL');
  	table.string('PASSWORD');
  	table.string('TWITCHID');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
