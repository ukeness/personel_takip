import { Response, Request } from "express";

export class CookieService{
    createCookie(res: Response,cookie: string,cookieName: string){
        res.cookie(`${cookieName}`, cookie, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
    }
    getCookie(req: Request): string{
        const token: string = req.cookies?.token || null;
        if(!token) throw new Error("token geçersiz veya süresi dolmuş");
        return token
    }
    destroyCookie(res: Response, cookie: string){
        res.clearCookie(cookie);
    }
}