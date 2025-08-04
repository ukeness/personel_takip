import { EmployeePositions } from "../../../domain/entities/EmployeePositions";
import { POSITION } from "../../../domain/enums/Positions";
import { IMainRepository } from "../../repositories/IMainRepository";

interface EmployeePositionsRequest {
    id: string,
    position?: POSITION,
    note?: string,
}
interface EmployeePositionsResponse {
    response: EmployeePositions,
    success: boolean,
}

export class UpdateEmployeePosition{
    constructor(private repository: IMainRepository<EmployeePositions>){}

    async execute(req: EmployeePositionsRequest): Promise<EmployeePositionsResponse>{

        const position = await this.repository.findById(req.id);

        if(!position) throw new Error("Pozisyon getirilemedi");

        if(req.position) position.UpdatePosition = req.position;
        if(req.note) position.updateNote = req.note;

        await this.repository.update(position.id,position);

        return{
            response: position,
            success: true
        }
    }
}