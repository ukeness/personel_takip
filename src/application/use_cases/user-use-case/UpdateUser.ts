import { Users } from "../../../domain/entities/Users";
import { ROLE } from "../../../domain/enums/Roles";
import { IMainRepository } from "../../repositories/IMainRepository";

interface UpdateUserRequest {
    id: string,
    username: string;
    password: string;
    is_active?: boolean;
    last_login?: Date;
}

interface UpdateUserResponse {
    message: string,
    success: boolean
    username?: string;
    password?: string;

}

export class UpdateUser{
    constructor(private repository: IMainRepository<Users>) {}

    async execute(req: UpdateUserRequest):Promise<UpdateUserResponse> {

        const user = await this.repository.findById(req.id);
        console.log("before update user: ", user)
        if(!user) throw new Error("Kullanıcı bulunamadı")
        if(req.username) user.updateName = req.username;
        if(req.password) user.updatePassword = req.password;
        if(req.is_active) user.updateIsActive = req.is_active;
        if(req.last_login) user.updateLastLogin = req.last_login;
        console.log("after update user: ", user)
        const response = await this.repository.update(user.id, user)
        console.log("response: ",response)
        return {
            message: "Kullanıcı başarıyla güncellendi",
            success: true,
            username: user.username,
            password: user.password,
        }



    }
}