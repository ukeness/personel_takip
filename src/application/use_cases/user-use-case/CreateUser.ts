import { Users } from "../../../domain/entities/Users";
import { IMainRepository } from "../../repositories/IMainRepository";


interface CreateUserRequest {
    username: string,
    password: string,
}

interface CreateUserResponse {
    message: string,
    success: boolean
}

export class CreateUser {
    constructor(private repository: IMainRepository<Users>) {}

    async execute(req: CreateUserRequest): Promise<CreateUserResponse> {
        const user = await Users.createUser(req.username, req.password)   
        await this.repository.create(user)
        return {
            message: "Kullanıcı sisteme başarıyla kayıt edildi",
            success: true
        }

    }
}