import { Knex } from "knex";
import {
  BLOG_TABLE_NAME,
  BlogKeys,
} from "../../types/types";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(BLOG_TABLE_NAME, (table) => {
    table.uuid(BlogKeys.ID).notNullable().unique;
    table.string(BlogKeys.TITLE).notNullable();
    table.double(BlogKeys.LONG).notNullable();
    table.double(BlogKeys.LAT).notNullable();
    table.string(BlogKeys.CREATED);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(BLOG_TABLE_NAME);
}
