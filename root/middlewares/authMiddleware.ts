import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
async function authToken(req: any,res: any,next: any){
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message: "Token Bulunamadı"});

    jwt.verify(token, process.env.SECRET_KEY as string, (err: any,user: any) => {
        if(err) return res.status(403).json({message: "Token geçersiz veya süresi dolmuş"});
        req.user = user;
        console.log("user-----------: " + req.user);
        next();
    });
}

export default authToken; 