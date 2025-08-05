import { UserModel } from "../../models/UserModel";
import { IMainRepository } from "../../../../application/repositories/IMainRepository";
import { Users } from "../../../../domain/entities/Users";
import { Employees } from "../../../../domain/entities/Employees";
import { UserRoles } from "../../../../domain/entities/UserRoles";
import { EmployeeModel } from "../../models/EmployeeModel";
import { UserRoleModel } from "../../models/UserRoleModel";
import { EmployeePositionModel } from "../../models/EmployeePositionModel";
import { EmployeePositions } from "../../../../domain/entities/EmployeePositions";

export class UserRepository implements IMainRepository<Users>{

    async toDomain(response: UserModel): Promise<Users> {
        if (!response.employee) {
            throw new Error(`User with id ${response.id} is missing employee data.`);
        }
        if (!response.user_role) {
            throw new Error(`User with id ${response.id} is missing user role data.`);
        }
        if (!response.employee.position) {
            throw new Error(`Employee data for user id ${response.id} is missing position data.`);
        }

        const employeeDomainObject = Employees.catchData({
            ...response.employee.get({ plain: true }),
            position: EmployeePositions.catchData(response.employee.position)
        });

        return Users.catchData({
            id: response.id,
            username: response.username,
            password: response.password,
            employee: employeeDomainObject,
            user_role: UserRoles.catchData(response.user_role),
            is_active: response.is_active,
            last_login: response.last_login,
            created_at: response.created_at,
            updated_at: response.updated_at,
        });
    }

    async create(user: Users): Promise<Users>{
        try{
            const createdUser = await UserModel.create({
                id: user.id,
                username: user.username,
                password: user.password,
                user_role_id: user.user_role.id,
                employee_id: user.employee.id,
                last_login: user.last_login,
                is_active: user.is_active,
                created_at: user.created_at,
                updated_at: user.updated_at,
            });
            const response = await this.findById(createdUser.id);
            if (!response) {
                throw new Error("Could not retrieve user after creation.");
            }
            return response;
        }catch(error: any){
            console.log("userRepository.create: ", error);
            throw new Error(`Error while creating User: ${error.message}`);
        }
    }

    async update(user_id: string, data: Partial<Users>): Promise<boolean>{
        try {
            const [affectedCount] =  await UserModel.update(data, {
                where: { id: user_id }
            });
            if(affectedCount > 0 ) return true;
            return false;
        }
        catch(error: any){
            console.log("userRepository.update: ", error);
            throw new Error(`Error while updating User: ${error.message}`);
        }
    }
    async findById(id: string): Promise<Users> {
        try{
            const response = await UserModel.findByPk(id, {
                include: [
                    {
                        model: EmployeeModel,
                        include: [EmployeePositionModel]
                    },
                    UserRoleModel
                ]
            });
            if(!response) throw new Error("User not found")
            return this.toDomain(response);
        }catch(error: any){
            console.log("userRepository.findById: ", error);
            throw new Error(`Error while find user by id: ${error.message}`);
        }
    }
    async findByName(username: string): Promise<Users> {
        try{
            const response = await UserModel.findOne({
                where: { username: username },
                include: [
                    {
                        model: EmployeeModel,
                        include: [EmployeePositionModel]
                    },
                    UserRoleModel
                ]
            });
            if(!response) throw new Error("User not found")
            return this.toDomain(response);
        }catch(error: any){
            console.log("userRepository.findByName: ", error);
            throw new Error(`Error while find user by name: ${error.message}`);
        }
    }
    async findByEmail(email: string): Promise<Users> {
        try{
            const response = await UserModel.findOne({
                include: [
                    {
                        model: EmployeeModel,
                        where: { email: email },
                        required: true,
                        include: [EmployeePositionModel]
                    },
                    UserRoleModel
                ]
            });
            if(!response) throw new Error("User not found")
            return this.toDomain(response)
        }catch(error: any){
            console.log("userRepository.findByEmail: ", error);
            throw new Error(`Error while find user by email: ${error.message}`);
        }
    }
    async findAll(): Promise<Users[]>{
        try{
            const response = await UserModel.findAll({
                include: [
                    {
                        model: EmployeeModel,
                        include: [EmployeePositionModel]
                    },
                    UserRoleModel
                ]
            })
            if(!response) throw new Error("cannot found anything");
            return await Promise.all(response.map(user => {
                return this.toDomain(user)
            }))
        }catch(error: any){
            console.log("userRepository.findAll: ", error);
            throw new Error(`Error while find all users: ${error.message}`);
        }

    }
    async delete(id: string): Promise<boolean>{
        try{
            const deletedRows = await UserModel.destroy({where: {id: id}})
            if(deletedRows >  0) return true;
            return false;
        }catch(error: any){
            console.log("userRepository.delete: ", error);
            throw new Error(`Error while deleting user: ${error.message}`);
        }
    }
}
