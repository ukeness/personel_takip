import { ROLE } from "../../domain/enums/Roles";
import { CookieService } from "../services/CookieService";
import { JWTService } from "../../infrastructure/services/JWTService";

import { NextFunction, Request,Response } from "express";

export class AuthorizeRole{
    constructor(
        private cookieService: CookieService,
        private jwtService: JWTService,
    ){}
    async isAdmin(req: Request,res: Response,next: NextFunction): Promise<void>{
        try{
            const token = this.cookieService.getCookie(req);
            console.log("token: ",token)
            const verifiedToken = await this.jwtService.verifyToken(token);
            console.log("verified Token: ", verifiedToken)
            if(verifiedToken.user_role === ROLE.ADMIN){
                next();
            } 
            else{
                res.status(401).json("Kullanıcının yetkisi yok");  
            }
        }catch(err: any){
            console.log("authorize error: ",err)
            res.status(401).json(err);
        }
    }
    async isUser(req: Request, res: Response, next: NextFunction){
        try{
            const token = this.cookieService.getCookie(req);
            console.log("token: ",token)
            const verifiedToken = await this.jwtService.verifyToken(token);
            console.log("verified Token: ", verifiedToken)
            if(verifiedToken.user_role === ROLE.USER){
                next();
            } 
            else{
                res.status(401).json("Kullanıcının yetkisi yok");  
            }
        }catch(err: any){
            console.log("authorize error: ",err)
            res.status(401).json(err);
        }
    }
    async isDemo(req: Request, res: Response, next: NextFunction){
        try{
            const token = this.cookieService.getCookie(req);
            console.log("token: ",token)
            const verifiedToken = await this.jwtService.verifyToken(token);
            console.log("verified Token: ", verifiedToken)
            if(verifiedToken.user_role === ROLE.DEMO){
                next();
            } 
            else{
                res.status(401).json("Kullanıcının yetkisi yok");  
            }
        }catch(err: any){
            console.log("authorize error: ",err)
            res.status(401).json(err);
        }
    }

}