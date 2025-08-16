import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize-typescript";
import { UserModel } from "../models/UsersModel";
import { EmployeeModel } from "../models/EmployeesModel";
import { EmployeePositionModel } from "../models/EmployeePositionsModel";
import { CompanyModel } from "../models/CompanyModel";
import { CompanyBranchesModel } from "../models/CompanyBranchesModel";
import { BranchWorkflowsModel } from "../models/BranchWorkflowsModel";


export const sequelize = new Sequelize({
    username: process.env.DB_USER,
    host: process.env.HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.PORT),
    logging: false,
    dialect: 'postgres',
});

sequelize.addModels([UserModel, EmployeeModel, EmployeePositionModel, CompanyModel, CompanyBranchesModel, BranchWorkflowsModel])