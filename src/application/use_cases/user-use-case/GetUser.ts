import { Users } from "../../../domain/entities/Users";
import { Employees } from "../../../domain/entities/Employees";
import { IMainRepository } from "../../repositories/IMainRepository";
import { ROLE } from "../../../domain/enums/Roles";

interface GetUserRequest {
    id: string,
}

interface GetUserResponse {
    username: string,
    password: string,
    employee: Employees | undefined,
    user_role: ROLE,
    is_active: boolean,
    last_login: Date | undefined,
    created_at: Date,
    updated_at: Date,
}

export class GetUser{
    constructor(private repository: IMainRepository<Users>){}

    async execute(request: GetUserRequest): Promise<GetUserResponse> {
        const response = await this.repository.findById(request.id);
        if(!response) throw new Error("User not exists")
        return {
            username: response.username,
            password: response.password,
            employee: response.employee,
            user_role: response.user_role,
            is_active: response.is_active,
            last_login: response.last_login,
            created_at: response.created_at,
            updated_at: response.updated_at,
        }
    }
}
