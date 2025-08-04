import { IMainRepository } from "../../../../application/repositories/IMainRepository";
import { UserRoles } from "../../../../domain/entities/UserRoles";
import { UserModel } from "../../models/UserModel";
import { UserRoleModel } from "../../models/UserRoleModel";

export class UserRoleRepository implements Partial<IMainRepository<UserRoles>>{

    async toDomain(response: UserRoleModel): Promise<UserRoles>{
        return UserRoles.catchData({
            id: response.id,
            role: response.role,
            created_at: response.created_at,
            updated_at: response.updated_at,
            note: response.note,
        })
    }

    async create(data: UserRoles): Promise<UserRoles>{
        try{
            const response = await UserRoleModel.create({
                id: data.id,
                role: data.role,
                created_at: data.created_at,
                updated_at: data.updated_at,
                note: data.note,
            })
            if(!response) throw new Error("user role cannot created")
            return this.toDomain(response)
        }catch(error: any){
            console.log("UserRoleRespository.create: ", error);
            throw new Error(`Error while trying to create user role: ${error.message}`)
        }
    }
    async update(id: string, data: UserRoles): Promise<boolean>{
        try{
            const userRole = await UserRoleModel.findByPk(id);

            if(!userRole) throw new Error("User role cannot found");

            if(userRole.role) data.updateRole = userRole.role;
            if(userRole.note) data.updateNote = userRole.note;

            const [affectedCount] = await UserRoleModel.update(data, {where: {id: data.id}});
            if(affectedCount > 0) return true;
            throw new Error("the user cannot be updated")
        }catch(error: any){
            console.log("UserRoleRespository.update: ", error);
            throw new Error(`Error while trying to update user role: ${error.message}`)
        }
    }
    async delete(id: string): Promise<boolean>{
        try{
        const affectedRows = await UserRoleModel.destroy({where: {id: id}});
        if(affectedRows > 0) return true;
        throw new Error("the user cannot be deleted");
    }catch(error: any){
        console.log("UserRoleRespository.delete: ", error);
        throw new Error(`Error while trying to delete user role: ${error.message}`)        
    }
    }
    async findById(id: string): Promise<UserRoles>{
        try{
            const response = await UserRoleModel.findByPk(id)
            if(!response) throw new Error("The user not found");
            return this.toDomain(response);
        }catch(error: any){
            console.log("UserRoleRespository.findById: ", error);
            throw new Error(`Error while trying to findById user role: ${error.message}`)  
        }
    }
    async findByName(role: string): Promise<UserRoles>{
        try{
            const response = await UserRoleModel.findOne({where: {role: role}});
            if(!response) throw new Error("The user not found");
            return this.toDomain(response)
        }catch(error:any){
            console.log("UserRoleRespository.findByName: ", error);
            throw new Error(`Error while trying to findByName user role: ${error.message}`)  
        }
    }

}