import { Knex } from "knex";
import {
  BLOG_TABLE_NAME,
  BlogKeys,
} from "../../types/types";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(BLOG_TABLE_NAME, (table) => {
    table.uuid(BlogKeys.ID).notNullable().unique;
    table.text(BlogKeys.TITLE).notNullable();
    table.text(BlogKeys.TYPE).notNullable();
    table.double(BlogKeys.LONG).notNullable();
    table.double(BlogKeys.LAT).notNullable();
    table.timestamps(true)
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(BLOG_TABLE_NAME);
}
