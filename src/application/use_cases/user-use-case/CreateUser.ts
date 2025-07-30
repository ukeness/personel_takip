import { col } from "sequelize";
import { Users } from "../../../domain/entities/Users";
import { IUserRepository } from "../../repositories/IUserRepository";
import { UserRoles } from "../../../domain/entities/UserRoles";
import { EmployeeModel } from "../../../infrastructure/database/models/EmployeeModel";
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
    constructor(private repository: IUserRepository<Users>) {}

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