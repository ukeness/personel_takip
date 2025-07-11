require("dotenv").config();
import {Request, Response} from "express"
import { User } from '../models/User.model';
const jwt = require("jsonwebtoken")
export const login = async (req: any,res: any) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        where: {
            username: username,
            password: password
        }
    })
    if(user == null) return res.status(403).json({message: "Kullanıcı ismi veya şifre yanlış"})
    const payload: {userId: number; username: string; role: string}= {
        userId: user.id,
        username: user.username,
        role: user.role,
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY as string, {expiresIn: "1h"})
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,   // Üretimde 'true' olmalı
        sameSite: "strict",
        maxAge: 3600000  // 1 saat
    });

    return res.redirect("/dashboard")
}

export const logout = (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    })
    res.json({message: "Çıkış Yapıldı"})
}