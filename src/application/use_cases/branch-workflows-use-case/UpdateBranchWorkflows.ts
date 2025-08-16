import { BranchWorkflows } from "../../../domain/entities/BranchWorkflows";
import { IMainRepository } from "../../repositories/IMainRepository";

interface UpdateBranchWorkflowsRequest {
    id: string;
    name?: string,
    shift_start?: Date;
    shift_end?: Date;
    break_start?: Date;
    break_end?: Date;
    overtime_allowed?: boolean;
}

interface UpdateBranchWorkflowsResponse {
    message: string;
    success: boolean;
}

export class UpdateBranchWorkflows {
    constructor(private repository: IMainRepository<BranchWorkflows>) {}

    async execute(req: UpdateBranchWorkflowsRequest): Promise<UpdateBranchWorkflowsResponse> {
        const BranchWorkflows = await this.repository.findById(req.id);
        if (!BranchWorkflows) {
            throw new Error("Şirket çalışma düzeni bulunamadı.");
        }

        if(req.name) BranchWorkflows.updateName = req.name;
        if (req.shift_start) BranchWorkflows.updateShiftStart = req.shift_start;
        if (req.shift_end) BranchWorkflows.updateShiftEnd = req.shift_end;
        if (req.break_start) BranchWorkflows.updateBreakStart = req.break_start;
        if (req.break_end) BranchWorkflows.updateBreakEnd = req.break_end;
        if (req.overtime_allowed) BranchWorkflows.updateOvertimeAllowed = req.overtime_allowed;

        await this.repository.update(BranchWorkflows.id,BranchWorkflows);

        return {
            message: "Şirket çalışma düzeni başarıyla güncellendi.",
            success: true
        };
    }
}
