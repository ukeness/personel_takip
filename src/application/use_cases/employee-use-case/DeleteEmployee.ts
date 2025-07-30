import { Employees } from "../../../domain/entities/Employees";
import { Users } from "../../../domain/entities/Users";
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";

interface DeleteEmployeeRequest {
    id: string,
}
interface DeleteEmployeeResponse {
    message: string,
    success: boolean
}

export class DeleteEmployee{
    constructor(private repository: IEmployeeRepository<Employees>) {}

    async execute(req: DeleteEmployeeRequest): Promise<DeleteEmployeeResponse> {
        const response = this.repository.delete(req.id);
        if(!response) throw new Error("The Employee to be deleted was not found")
        return {
            message: "Çalışan başarıyla silindi",
            success: true
        }
    }
}