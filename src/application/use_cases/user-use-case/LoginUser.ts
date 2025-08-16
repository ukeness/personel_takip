import { Users } from "../../../domain/entities/Users";
import { IMainRepository } from "../../repositories/IMainRepository";
import { IPasswordHashService } from "../../services/IPasswordHashService";
import { IJWTService } from "../../services/IJWTService";


interface LoginPayloadDTO{
    username: string,
    password: string,
}


interface LoginResponse{
    token: string,
    message: string,
    success: boolean,
}
export class LoginUser{
    constructor(
        private repository: IMainRepository<Users>,
        private passwordHashService: IPasswordHashService,
        private JWTService: IJWTService,
    
    ){}

    async execute(loginPayload: LoginPayloadDTO): Promise<LoginResponse>{
        const user = await this.repository.findByName(
            loginPayload.username,
        )
        if(!user) throw new Error("Kullanıcı ismi yanlış!");
        const isvalid = this.passwordHashService.comparePassword(loginPayload.password,user.password);
        if(!isvalid) throw new Error("Şifre yanlış!");
        const token = this.JWTService.generateToken({
            username: user.username,
            user_role: user.user_role,
        });
        return{
            token: token,
            message: "Kullanıcı Doğrulandı",
            success: true,
        }
    }
}