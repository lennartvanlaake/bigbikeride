import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('blogs', (table) => {
        table.uuid('id').notNullable().unique;
        table.string('title');
        table.string('type').notNullable();
        table.double('long').notNullable();
        table.double('lat').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('blogs');
}

