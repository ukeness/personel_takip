import { UserRoles } from "../../../domain/entities/UserRoles";
import { ROLE } from "../../../domain/enums/RoleTypes";
import { IMainRepository, } from "../../repositories/IMainRepository";

interface CreateUserRoleRequest{
    role: ROLE,
    note?: string,
}
interface CreateUserRoleResponse{
    message: string,
    success: boolean
}

export class CreateUserRole{
    constructor(private repository: IMainRepository<UserRoles>){}

    async execute(req: CreateUserRoleRequest): Promise<CreateUserRoleResponse>{
        const userRole = await UserRoles.createRole(req.role, req.note);
        if(!userRole) throw new Error("Rol oluşturulamadı");
        const response = await this.repository.create(userRole);
        if(!response) throw new Error("Sunucu taraflı bir hata oluştu");
        return {
            message: "Kullanıcı başarıyla oluşturuldu",
            success: true,
        }
    }
}