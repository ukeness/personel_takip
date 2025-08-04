import { UserRoles } from "../../../domain/entities/UserRoles";
import { IMainRepository } from "../../repositories/IMainRepository";

interface DeleteUserRoleRequest {
    id: string,
}
interface DeleteUserRoleResponse{
    message: string,
    success: boolean,
}
export class DeleteUserRole{
    constructor(private repository: IMainRepository<UserRoles>){}

    async execute(req: DeleteUserRoleRequest): Promise<DeleteUserRoleResponse>{
        const response = await this.repository.delete(req.id);
        if(!response) throw new Error("Kullanıcı Silinemedi");
        return{
            message: "Kullanıcı başarıyla silindi",
            success: true,
        }
    }
}
