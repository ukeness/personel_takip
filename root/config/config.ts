require('dotenv').config();
// root/config/database.ts
import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User.model';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  models: [User],  // Model burada tanımlanır
});

export default sequelize;
