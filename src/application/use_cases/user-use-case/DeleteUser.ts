import { Users } from "../../../domain/entities/Users";
import { IUserRepository } from "../../repositories/IUserRepository";

interface DeleteUserRequest {
    id: string,
}

interface DeleteUserResponse {
    message: string,
    success: boolean,
}

export class DeleteUser{
    constructor(private repository: IUserRepository<Users>) {}

    async execute(request: DeleteUserRequest): Promise<DeleteUserResponse>{
        const response = await this.repository.delete(request.id)
        if(!response) throw new Error("The User to be deleted was not found")
        return{
            message: "User is deleted successfully",
            success: true,
        }
    }

}