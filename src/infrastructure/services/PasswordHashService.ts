import bcrypt from "bcrypt";
import { IPasswordHashService } from "../../application/services/IPasswordHashService";

export class PasswordHashService implements IPasswordHashService{ 
    hashPassword(password: string): string{
        if(!password) throw new Error("Hash işlemi yapılacak Şifre bilgisi bulunamadı")
        const genSalt = 10;
        return bcrypt.hashSync(password,genSalt)
    }
    comparePassword(password: string, hashedPassword: string): boolean{
        if(!password || !hashedPassword) throw new Error("Doğrulanacak şifre bilgisi bulunamadı");
        return bcrypt.compareSync(password,hashedPassword);
    }
}