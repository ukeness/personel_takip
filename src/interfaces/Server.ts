import express from "express"
import cookieParser from "cookie-parser";

import { CreateUser } from "../application/use_cases/user-use-case/CreateUser";
import { DeleteUser } from "../application/use_cases/user-use-case/DeleteUser";
import { GetUser } from "../application/use_cases/user-use-case/GetUser";
import { UpdateUser } from "../application/use_cases/user-use-case/UpdateUser";
import { LoginUser } from "../application/use_cases/user-use-case/LoginUser";

import { UserRepository } from "../infrastructure/database/repositories/user-repositories/UserRepository";

import { createUserRoutes } from "./routes/user-routes/UserRoute";

import { AuthUserController } from "./controllers/user-controllers/AuthUserController";
import { UserController } from "./controllers/user-controllers/UserControllers";

import { CookieService } from "./services/CookieService";
import { JWTService } from "../infrastructure/services/JWTService";
import { PasswordHashService } from "../infrastructure/services/PasswordHashService";

import { sequelize } from "../infrastructure/database/config/connect";
import { AuthorizeRole } from "./middlewares/AuthorizeRole";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const userRepository = new UserRepository();

const passwordHashService = new PasswordHashService();
const cookieService = new CookieService()
const jwtService = new JWTService();

const createUser = new CreateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);
const updateUser = new UpdateUser(userRepository);
const getUser = new GetUser(userRepository);
const loginUser = new LoginUser(userRepository,passwordHashService,jwtService);

const userController = new UserController(createUser,deleteUser,getUser,updateUser);
const authUserController = new AuthUserController(loginUser,cookieService)

const authorizeRole = new AuthorizeRole(cookieService,jwtService)





app.use("/", createUserRoutes(userController, authUserController, authorizeRole))

app.listen(5000, "localhost", async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("server is running on port 5000")
    }catch(error: any){
        console.log("Vertiabanına bağlanılamadı: ", error.message)

    }

})
