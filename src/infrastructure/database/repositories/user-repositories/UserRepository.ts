import { IMainRepository } from "../../../../application/repositories/IMainRepository";
import { Users } from "../../../../domain/entities/Users";
import { UserModel } from "../../models/UsersModel";
import { Employees } from "../../../../domain/entities/Employees";
import { EmployeeModel } from "../../models/EmployeesModel";
import { EmployeePositionModel } from "../../models/EmployeePositionsModel";
import { EmployeePositions } from "../../../../domain/entities/EmployeePositions";
import { PasswordHashService } from "../../../services/PasswordHashService";

export class UserRepository implements IMainRepository<Users>{
    
    async toDomain(response: UserModel): Promise<Users> {
        const passwordHashService = new PasswordHashService();
        /*const employeeDomainObject = Employees.catchData({
            ...response.employee.get({ plain: true }),
            position: EmployeePositions.catchData(response.employee.position)
        });*/

        return Users.catchData({
            id: response.id,
            username: response.username,
            password: response.password,
            employee: undefined,
            user_role: response.user_role,
            is_active: response.is_active,
            last_login: response.last_login,
            created_at: response.created_at,
            updated_at: response.updated_at,
        });
    }

    async create(user: Users): Promise<Users>{
        try{
            const passwordHashService = new PasswordHashService();
            const createdUser = await UserModel.create({
                id: user.id,
                username: user.username,
                password: passwordHashService.hashPassword(user.password),
                user_role_id: user.user_role,
                employee_id: user.employee?.id,
                last_login: user.last_login,
                is_active: user.is_active,
                created_at: user.created_at,
                updated_at: user.updated_at,
            });
            /*const response = await this.findById(createdUser.id);
            if (!response) {
                throw new Error("Could not retrieve user after creation.");
            }*/
            const response = await this.toDomain(createdUser)
            return response;
        }catch(error: any){
            console.log("userRepository.create: ", error);
            throw new Error(`Error while creating User: ${error.message}`);
        }
    }

    async update(user_id: string, data: Partial<Users>): Promise<boolean>{
        try {
            const passwordHashService = new PasswordHashService();
            const [affectedCount,affectedRows] =  await UserModel.update({
                username: data.username,
                password: data.password,
                is_active: data.is_active,
                last_login: data.last_login,
                updated_at: data.updated_at,
            }, {
                where: { id: user_id },
                returning: true,
                logging: true,
            });
            console.log(affectedRows);
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
                ]
            });
            if(!response) throw new Error("User not found")
            return this.toDomain(response);
        }catch(error: any){
            console.log("userRepository.findById: ", error);
            throw new Error(`Error while find user by id: ${error.message}`);
        }
    }
    async findByName(username: string): Promise<Users | null> {
        try{
            const response = await UserModel.findOne({
                where: { username: username },
                include: [
                    {
                        model: EmployeeModel,
                        include: [EmployeePositionModel]
                    },                    
                ]
            });
            if(!response) return null
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
                    }                   
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
