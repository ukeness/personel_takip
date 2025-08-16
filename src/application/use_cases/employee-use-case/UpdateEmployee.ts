import { Employees } from "../../../domain/entities/Employees";
import { EmployeePositions } from "../../../domain/entities/EmployeePositions";
import { IMainRepository } from "../../repositories/IMainRepository";

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
interface UpdateEmployeeResponse{
    success: boolean,
    response: Employees,
    message: string,
}
export class UpdateEmployee {
    constructor(private repository: IMainRepository<Employees>) {}

    async execute(req: UpdateEmployeeRequest): Promise<UpdateEmployeeResponse>{
        
        const employee = await this.repository.findById(req.id);
        if(!employee) throw new Error("Güncellenecek çalışan bulunamadı")
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

        return{
            success: true,
            response: employee,
            message: "Kullanıcı başarıyla Güncellendi",
        }

    }
}
