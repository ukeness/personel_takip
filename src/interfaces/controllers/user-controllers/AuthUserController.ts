import { Request, Response } from "express";
import { LoginUser } from "../../../application/use_cases/user-use-case/LoginUser";
import { CookieService } from "../../services/CookieService";

export class AuthUserController{
    constructor(
        private LoginUser: LoginUser,
        private CookieService: CookieService,
    ){}

    async loginUser(req: Request, res: Response){
        try{
            const { username, password } = req.body;
            const response = await this.LoginUser.execute({username,password});
            this.CookieService.createCookie(res,response.token, "token");
            res.status(200).json({
                token: response.token,
                message: response.message,
                success: true,
            })
        }catch(error: any){
            res.status(400).json({
               message: error.message,
               success: false,
            })
        }
    }
}