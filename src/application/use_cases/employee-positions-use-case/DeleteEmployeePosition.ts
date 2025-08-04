import { EmployeePositions } from "../../../domain/entities/EmployeePositions";
import { IMainRepository } from "../../repositories/IMainRepository";

interface DeleteEmployeeRequest {
    id: string,
}

interface DeleteEmployeeResponse {
    message: string,
    success: true,
}

export class DeleteEmployee {
    constructor(private repository: IMainRepository<EmployeePositions>){}

    async execute(req: DeleteEmployeeRequest): Promise<DeleteEmployeeResponse> {
        const response = await this.repository.delete(req.id);
        if(!response) throw new Error("The Employee was not deleted");
        return {
            message: "Çalışan Başarıyla Silindi",
            success: true
        }
    }
}