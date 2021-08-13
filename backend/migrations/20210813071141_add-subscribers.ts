import { Knex } from "knex";
import { SubscriberKeys, SUBSCRIBERS_TABLE_NAME } from "../../types/types";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(SUBSCRIBERS_TABLE_NAME, (table) => {
		table.uuid(SubscriberKeys.ID).primary().notNullable(),
			table.string(SubscriberKeys.NAME).notNullable(),
			table
				.string(SubscriberKeys.EMAIL)
				.unique()
				.notNullable(),
			table.timestamps(false);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropSchema(SUBSCRIBERS_TABLE_NAME);
}
