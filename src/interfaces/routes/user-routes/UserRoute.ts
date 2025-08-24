import { Request, Response, Router } from "express";
import { UserController } from "../../controllers/user-controllers/UserControllers";
import { AuthUserController } from "../../controllers/user-controllers/AuthUserController";

import { AuthorizeRole } from "../../middlewares/AuthorizeRole";

export function createUserRoutes(UserController: UserController, AuthUserController: AuthUserController, authorizeRole: AuthorizeRole): Router{
    const router = Router();
    router.get("/users/login", (req: Request, res:Response) => {
        res.sendFile(process.cwd() + "/src/interfaces/public/html/Login.html");
    })
    router.post("/users/login", (req: Request, res:Response) => {
        AuthUserController.loginUser(req,res);
    })
    router.get("/users/create",authorizeRole.isAdmin.bind(authorizeRole), (req: Request, res: Response) => {
        res.sendFile(process.cwd() + "/CreateUser.html");
    })
    router.post("/users/create", (req: Request, res: Response) => {
        UserController.createUser(req,res);
    });
    router.get("/users/update", (req: Request, res: Response) => {
        res.sendFile(process.cwd() + "/UpdateUser.html")
    })
    router.post("/users/update", (req: Request, res:Response) => {
        UserController.updateUser(req,res);
    });
    router.get("/users/delete/:id", (req: Request, res:Response) => {
        UserController.deleteUser(req,res);
    })
    router.get("/users/get/:id", (req: Request, res:Response) => {
        UserController.getUser(req,res);
    })    
    router.get("/users", (req: Request, res: Response) => {
        res.send("Kullanıcı sayfası");
    })


    return router;
}