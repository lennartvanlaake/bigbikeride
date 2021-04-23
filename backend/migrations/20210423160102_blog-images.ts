import { Knex } from "knex";
import { IMAGE_BLOG_TABLE_NAME, ImageBlogKeys } from "../../types/types"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(IMAGE_BLOG_TABLE_NAME, (table) => {
    table.uuid(ImageBlogKeys.BLOG_ID).notNullable(),
    table.uuid(ImageBlogKeys.IMAGE_ID).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(IMAGE_BLOG_TABLE_NAME);
}

