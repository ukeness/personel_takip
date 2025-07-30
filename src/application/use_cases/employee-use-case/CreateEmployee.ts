import { Employees } from "../../../domain/entities/Employees";
import { EmployeePositions } from "../../../domain/entities/EmployeePositions";
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";

interface CreateEmployeeRequest {
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
    companies_id: string,
    created_at: Date,
    updated_at: Date,    
}

interface CreateEmployeeResponse {
    message: string,
    success: boolean,
}

export class CreateEmployee{
    constructor(private repository: IEmployeeRepository<Employees>) {}

    async execute(req: CreateEmployeeRequest): Promise<CreateEmployeeResponse> {
        const data = await Employees.createEmployee(
            req.name,
            req.surname,
            req.country,
            req.city,
            req.district,
            req.address,
            req.email,
            req.phone,
            req.position,
            req.birth_date,
            req.gender,
            req.national_id,
            req.companies_id,
        )
        const response = await this.repository.create(data);
        if(!response) throw new Error("The Employee creation process could not happened");
        return{
            message: "Çalışan başarıyla oluşturuldu",
            success: true,
        }
    }
}