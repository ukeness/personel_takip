import { UserRoles } from "../../../domain/entities/UserRoles";
import { Users } from "../../../domain/entities/Users";
import { IMainRepository } from "../../repositories/IMainRepository";

interface UpdateUserRequest {
    id: string,
    username: string;
    password: string;
    user_role: UserRoles;
    is_active: boolean;
    last_login: Date;
}

interface UpdateUserResponse {
    username?: string;
    password?: string;
}

export class UpdateUser{
    constructor(private repository: IMainRepository<Users>) {}

    async execute(req: UpdateUserRequest):Promise<UpdateUserResponse> {

        const user = await this.repository.findById(req.id);
        if(!user) throw new Error("error")
        if(req.username) user.updateName = req.username;
        if(req.password) user.updatePassword = req.password;
        if(req.user_role) user.updateUserRole = req.user_role;
        if(req.is_active) user.updateIsActive = req.is_active;
        if(req.last_login) user.updateLastLogin = req.last_login;
        await this.repository.update(user.id, user)
        return {
            username: user.username,
            password: user.password,
        }



    }
}