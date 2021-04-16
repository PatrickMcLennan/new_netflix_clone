import { Knex } from 'knex';
import { Role } from '../types/generated.types';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(`users`, table => {
    table.increments(`id`).primary();
    table.string(`email`).notNullable().unique();
    table.string(`password`).notNullable();
    table.string(`firstName`).notNullable();
    table.string(`lastName`).notNullable();
    table.enum(`role`, Object.keys(Role)).defaultTo(Role['User']).notNullable();
    table.string(`createdAt`).defaultTo(knex.fn.now());
    table.string(`updatedAt`).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTableIfExists(`users`);
}
