import { EmployeePositions } from "../../../domain/entities/EmployeePositions";
import { IMainRepository } from "../../repositories/IMainRepository";

interface CreateEmployeePositionRequest{
    position: string,
    note?: string
} 
interface CreateEmployeePositionResponse{
    message: string,
    success: boolean,
}

export class CreateEmployeePosition{
    constructor(private repository: IMainRepository<EmployeePositions>){}

    async execute(req: CreateEmployeePositionRequest): Promise<CreateEmployeePositionResponse>{
        const user = await EmployeePositions.createPosition(
            req.position,
            req.note,
        )
        if(!user) throw new Error("Kullanıcı pozisyonu eklerken bir hata oluştu")
        const response = await this.repository.create(user);
        if(!response || response == null) throw new Error("Sunucu taraflı bir hata oluştu lütfen takrar deneyin");
        return{
            message:  "Kullanıcı pozisyonu başarıyla eklendi",
            success: true,        
        }
    }


}