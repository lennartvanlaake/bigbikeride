import { Knex } from "knex";
import { CONTENT_BLOG_TABLE_NAME, BlogContentKeys } from "../../types/types";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(CONTENT_BLOG_TABLE_NAME, (table) => {
    table.uuid(BlogContentKeys.ID).notNullable().unique;
    table.string(BlogContentKeys.CONTENT).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(CONTENT_BLOG_TABLE_NAME);
}
