import { Knex } from "knex";
import {
  BLOG_TABLE_NAME,
  CONTENT_BLOG_TABLE_NAME,
  BlogKeys,
  BlogContentKeys,
} from "../../types/types";

export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable(BLOG_TABLE_NAME, (table) => {
    table.uuid(BlogKeys.ID).notNullable().unique;
    table.string(BlogKeys.TITLE).notNullable();
    table.double(BlogKeys.LONG).notNullable();
    table.double(BlogKeys.LAT).notNullable();
    table.string(BlogKeys.CREATED);
  });

  knex.schema.createTable(CONTENT_BLOG_TABLE_NAME, (table) => {
    table.uuid(BlogContentKeys.ID).notNullable().unique;
    table.string(BlogContentKeys.CONTENT).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable(BLOG_TABLE_NAME);
  knex.schema.dropTable(CONTENT_BLOG_TABLE_NAME);
}
