import { Employees } from "../../../domain/entities/Employees";
import { EmployeePositions } from "../../../domain/entities/EmployeePositions";
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";

interface UpdateEmployeeRequest{
    id: string,
    name?: string,
    surname?: string,
    country?: string,
    city?: string,
    district?: string,
    address?: string,
    email?: string,
    phone?: string,
    position?: EmployeePositions,
    gender?: string,   
}

export class UpdateEmployee {
    constructor(private repository: IEmployeeRepository<Employees>) {}

    async execute(req: UpdateEmployeeRequest): Promise<void>{
        
        const employee = await this.repository.findById(req.id);
        if(!employee) throw new Error("Employee to be updated was not found")
        if(req.name) employee.updateName = req.name;
        if(req.surname) employee.updateSurname = req.surname;
        if(req.country) employee.updateCountry = req.country;
        if(req.city) employee.updateCity = req.city;
        if(req.district) employee.updateDistrict = req.district;
        if(req.address) employee.updateAddress = req.address;
        if(req.email) employee.updateEmail = req.email;
        if(req.phone) employee.updatePhone = req.phone;
        if(req.position) employee.updatePosition = req.position;
        if(req.gender) employee.updateGender = req.gender;

        await this.repository.update(employee.id, employee)

    }
}
