import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
export const isAdmin = async (req: Request, res:Response, next: NextFunction) => {
    const token: string = req.cookies.token;
    if(!token) return res.json({message: "Token bulunamadı"});
    jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded: any) => {
        if(err || !decoded) return res.json({message: "Token Geçersiz Veya Süresi dolmuş"});
        if(decoded.role == 'admin') return next();
        else {return res.json({message: "Bu sayfaya erişim yetkiniz yoktur"})};
    })

}

export const isUser = async (req: Request, res:Response, next: NextFunction) => {
    const token: string = req.cookies.token;
    if(!token) return res.json({message: "Token bulunamadı"});
    jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded: any) => {
        if(err || !decoded) return res.json({message: "Token Geçersiz Veya Süresi dolmuş"});
        if(decoded.role == 'user') return next();
        else {return res.json({message: "Bu sayfaya erişim yetkiniz yoktur"})};
    })


 
}