"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const types_1 = require("../../types/types");
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable(types_1.IMAGE_TABLE_NAME, (table) => {
            table.uuid("id" /* ID */).notNullable(),
                table.text("path" /* PATH */).notNullable();
            table.text("description" /* DESCRIPTION */);
            table.timestamps(true);
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropSchema(types_1.IMAGE_TABLE_NAME);
    });
}
exports.down = down;
//# sourceMappingURL=20210423160947_images.js.map