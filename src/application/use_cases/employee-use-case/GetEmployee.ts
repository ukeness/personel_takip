import { Employees } from "../../../domain/entities/Employees";
import { EmployeePositions } from "../../../domain/entities/EmployeePositions";
import { IMainRepository } from "../../repositories/IMainRepository";

interface GetEmployeeRequest {
    id: string,
}

interface GetEmployeeResponse {
    id: string,
    name: string,
    surname: string,
    country: string,
    city: string,
    district: string,
    address: string,
    email: string,
    phone: string,
    position: EmployeePositions,
    birth_date: Date,
    gender: string,
    national_id: string,
    created_at: Date,
    updated_at: Date,    
}

export class GetEmployee {
    constructor(private repository: IMainRepository<Employees>) {}

    async execute(req: GetEmployeeRequest): Promise<GetEmployeeResponse>{
        const employee = await this.repository.findById(req.id);
        if(!employee) throw new Error("Employee not found");
        return {
            id: employee.id,
            name: employee.name,
            surname: employee.surname,
            country: employee.country,
            city: employee.city,
            district: employee.district,
            address: employee.address,
            email: employee.email,
            phone: employee.phone,
            position: employee.position,
            birth_date: employee.birth_date,
            gender: employee.gender,
            national_id: employee.national_id,
            created_at: employee.created_at,
            updated_at: employee.updated_at,
        }
    }
}