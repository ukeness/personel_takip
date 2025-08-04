import { UserRoles } from "../../../domain/entities/UserRoles";
import { ROLE } from "../../../domain/enums/RoleTypes";
import { IMainRepository } from "../../repositories/IMainRepository";

interface UpdateUserRoleRequest {
    id: string,
    role?: ROLE
    note?: string
}
interface UpdateUserRoleResponse{
    message: string,
    success: boolean,
}

export class UpdateUserRole{
    constructor(private repository: IMainRepository<UserRoles>){}

    async execute(req: UpdateUserRoleRequest): Promise<UpdateUserRoleResponse>{
        const userRole = await this.repository.findById(req.id);
        if(!userRole) throw new Error("Kullanıcı rolüne ulaşılamadı")
        if(req.role) userRole.updateRole = req.role;
        if(req.note) userRole.updateNote = req.note;

        const response = await this.repository.update(req.id, userRole);
        if(!response) throw new Error("Kullanıcı Rolu Güncellenemedi");
        return{
            message: "Kullanıcı başarıyla güncellendi.",
            success: true,
        }
    }
}