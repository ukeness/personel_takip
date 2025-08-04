
import { EmployeePositions } from "../../../domain/entities/EmployeePositions";
import { POSITION } from "../../../domain/enums/Positions";
import { IMainRepository } from "../../repositories/IMainRepository";

interface GetEmployeePositionRequest {
    id: string,
}
interface GetEmployeePositionResponse {
    success: boolean
    position: POSITION,
    note?: string,

}

export class GetEmployeePosition {
    constructor(private repository: IMainRepository<EmployeePositions>){}

    async execute(req: GetEmployeePositionRequest): Promise<GetEmployeePositionResponse>{
        const response = await this.repository.findById(req.id);
        if(!response || response == null) throw new Error("Çalışan Pozisyonu Bulunamadı");
        return{
            success: true,
            position: response.position,
            note: response.note,
        }
    }
}