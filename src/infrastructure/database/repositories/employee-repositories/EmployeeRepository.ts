import { Employees } from "../../../../domain/entities/Employees";
import { IMainRepository } from "../../../../application/repositories/IMainRepository";
import { EmployeeModel } from "../../models/EmployeeModel";
import { Model } from "sequelize-typescript";
import { UserModel } from "../../models/UserModel";



export class EmployeeRepository implements IMainRepository<Employees>{
    
    async toDomain(response: EmployeeModel): Promise<Employees>{
        try{
            return await Employees.catchData({
                id: response.id,
                name: response.name,
                surname: response.surname,
                country: response.country,
                city: response.city,
                district: response.district,
                address: response.address,
                email: response.email,
                phone: response.phone,
                position: response.position,
                birth_date: response.birth_date,
                gender: response.gender,
                national_id: response.national_id,
                created_at: response.created_at,
                updated_at: response.updated_at
            })
        }catch(error: any){
            console.log("EmployeeRepository.toDomain: ", error);
            throw new Error(`error while responding to domain: ${error.message}`);
        }

    }

    async create(data: Employees): Promise<Employees>{
        try{
            const response = await EmployeeModel.create({
                id: data.id,
                name: data.name,
                surname: data.surname,
                country: data.country,
                city: data.city,
                district: data.district,
                address: data.address,
                email: data.email,
                phone: data.phone,
                position: data.position,
                birth_date: data.birth_date,
                gender: data.gender,
                national_id: data.national_id,
                created_at: data.created_at,
                updated_at: data.updated_at,     
            })
            return this.toDomain(response)
        }catch(error: any){
            console.log("EmployeeRepository.create Error: ", error);
            throw new Error(`Error while creating employee: ${error.message}`)
        }
    }

    async update(id: string, data: Employees):  Promise<boolean>{
        try{
            const [affectedCount] = await EmployeeModel.update(data, {where: {id: id}});

            if(affectedCount > 0 ){
                return true
            }
            return false
        }catch(error: any){
            console.log("EmployeeRepository update: ", error);
            throw new Error(`error while updating employee: ${error.message}`)
        }    
    }
    async findById(id: string): Promise<Employees> {
        try{
            const employee = await EmployeeModel.findByPk(id);
            if(!employee) throw new Error("The employee cannot get from database")
            return this.toDomain(employee)            
        }catch(error: any){
            console.log("EmployeeRepository.findById: ", error);
            throw new Error(`Error while trying to fetch employee: ${error.message}`)
        }
    }
    async findByName(name: string): Promise<Employees>{
        try{
            const employee = await EmployeeModel.findOne({where: {name: name}})
            if(!employee) throw new Error("The employee cannot get from database")
            return this.toDomain(employee)   
        }catch(error: any){
            console.log("EmployeeRepository.findByName: ", error);
            throw new Error(`Error while trying to find employee By Name: ${error.message}`)
        }
    }
    async findByEmail(email: string): Promise<Employees>{
        try{
            const employee = await EmployeeModel.findOne({where: {email: email}})
            if(!employee) throw new Error("The employee cannot get from database")
            return this.toDomain(employee)   
        }catch(error: any){
            console.log("EmployeeRepository.findByEmail: ", error);
            throw new Error(`Error while trying to find employee By Email: ${error.message}`)
        }
    }
    async findAll(): Promise<Employees[]>{
        try{
            const employees = await EmployeeModel.findAll();
            if(employees.length == 0) throw new Error("Cannot find any employee");
            return Promise.all(employees.map(employee => {
                return this.toDomain(employee);
            }))
        }catch(error: any){
            console.log("EmployeeRepository.findAll: ", error);
            throw new Error(`Error while trying to find all employees: ${error.message}`)
        }

    }
    async delete(id: string):Promise<boolean>{
        try{
            const deletedRows = await EmployeeModel.destroy({where: {id: id}})
            if(deletedRows > 0) return true
            return false
        }catch(error: any){
            console.log("EmployeeRepository.delete: ", error);
            throw new Error(`Error while trying to destroy employee: ${error.message}`)
        }
    }

}