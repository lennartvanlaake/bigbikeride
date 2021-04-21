import { knex } from "knex";
import * as config from "./knexfile";
// import { BlogType } from '../types/types';

export const connection = knex(config);

// require('dotenv').config()

// export const sequelize = new Sequelize(
//     process.env.PGDATABASE!,
//     process.env.PGUSER!,
//     process.env.PGPASSWORD,
//     {
//         host: process.env.PGHOST!,
//         port: Number(process.env.PGPORT),
//         dialect: 'postgres'
//     });

// export class BlogEntity extends Model {
//     public id!: string;
//     public long!: number;
//     public lat!: number;
//     public type!: BlogType;
//     public title: string | undefined;
// }

// BlogEntity.init({
//     id: {
//         type: DataTypes.UUID,
//         primaryKey: true,
//         allowNull: false,
//         defaultValue: UUIDV4
//     },
//     long: {
//         type: DataTypes.DOUBLE,
//         allowNull: false
//     },
//     lat: {
//         type: DataTypes.DOUBLE,
//         allowNull: false
//     },
//     type: {
//         type: DataTypes.TEXT
//     },
//     title: {
//         type: DataTypes.TEXT,
//     }
// },
// {
//     tableName: "blogs",
//     sequelize
// })
