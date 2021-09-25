import { Knex } from "knex";
import { ImageKeys, IMAGE_TABLE_NAME } from "../../types/types";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.table(IMAGE_TABLE_NAME, (table) => {
		table.string(ImageKeys.TURN);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.table(IMAGE_TABLE_NAME, (table) => {
		table.dropColumn(ImageKeys.TURN);
	});
}
