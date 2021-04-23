import { Knex } from "knex";
import {ImageKeys, IMAGE_TABLE_NAME} from "../../types/types";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(IMAGE_TABLE_NAME, (table) => {
    table.uuid(ImageKeys.ID).notNullable(),
    table.text(ImageKeys.PATH).notNullable();
    table.text(ImageKeys.DESCRIPTION);
    table.timestamps(true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropSchema(IMAGE_TABLE_NAME);
}

