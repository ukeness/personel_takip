import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize-typescript";
import { UserModel } from "../models/UserModel";


export const sequelize = new Sequelize({
    username: process.env.DB_USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.PORT),
    logging: false,
    dialect: 'postgres',
});

sequelize.addModels([UserModel])