import { Users } from "../../../domain/entities/Users";
import { IMainRepository } from "../../repositories/IMainRepository";
import { UserRoles } from "../../../domain/entities/UserRoles";
import { Employees } from "../../../domain/entities/Employees";

interface CreateUserRequest {
    username: string,
    password: string,
    role: UserRoles,
    employee?: Employees
}

interface CreateUserResponse {
    message: string,
    succes: boolean
}

export class CreateUser {
    constructor(private repository: IMainRepository<Users>) {}

    async execute(req: CreateUserRequest): Promise<CreateUserResponse> {

        const user = await Users.createUser(req.username, req.password,req.role, req.employee)
        
        const response = await this.repository.create(user)
        if(!response) throw new Error("the user creation process could not happened")
        return {
            message: "Kullanıcı sisteme başarıyla kayıt edildi",
            succes: true
        }

    }
}