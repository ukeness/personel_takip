import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

interface payloadDTO{
    username: string,
    user_role: string,
}

export class JWTService{
    generateToken(payload: payloadDTO): string{
        const secretKey = process.env.SECRET_KEY;
        if(!secretKey) throw new Error("token oluştururken Secret Key bulunamadı.");
        return jwt.sign(payload,secretKey,{
            expiresIn: "1h",
            subject: `user_${payload.user_role}`,
        })
    }
   async verifyToken(token: string): Promise<payloadDTO> {
        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) throw new Error("Secret key not found while verifying token.");
        if (!token) throw new Error("No token found to verify.");
        try {
            const decoded = jwt.verify(token, secretKey) as payloadDTO;
            console.log("decoded token: ", decoded)
            return decoded;
        } catch (err) {
            throw new Error("Invalid or expired token.");
        }
   }


} 








