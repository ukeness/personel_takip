import { BranchWorkflows } from "../../../domain/entities/BranchWorkflows";
import { IMainRepository } from "../../repositories/IMainRepository";

interface CreateBranchWorkflowsRequest {
    name: string,
    shift_start: Date;
    shift_end: Date;
    break_start: Date;
    break_end: Date;
    shift_duration: string;
    brake_duration: string;
    overtime_allowed: boolean;
}

interface CreateBranchWorkflowsResponse {
    message: string;
    success: boolean;
}

export class CreateCompanyWorkflows {
    constructor(private repository: IMainRepository<BranchWorkflows>) {}

    async execute(req: CreateBranchWorkflowsRequest): Promise<CreateBranchWorkflowsResponse> {
        const companyWorkflows = await BranchWorkflows.createBranchWorkflow(
            req.name,
            req.shift_start,
            req.shift_end,
            req.break_start,
            req.break_end,
            req.overtime_allowed
        );
        await this.repository.create(companyWorkflows);
        return {
            message: "Şirket çalışma düzeni başarıyla oluşturuldu.",
            success: true
        };
    }
}
