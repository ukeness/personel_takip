import { BranchWorkflows } from "../../../domain/entities/BranchWorkflows";
import { IMainRepository } from "../../repositories/IMainRepository";

interface DeleteBranchWorkflowsRequest {
    id: string;
}

interface DeleteBranchWorkflowsResponse {
    message: string;
    success: boolean;
}

export class DeleteCompanyWorkflows {
    constructor(private repository: IMainRepository<BranchWorkflows>) {}

    async execute(req: DeleteBranchWorkflowsRequest): Promise<DeleteBranchWorkflowsResponse> {
        await this.repository.delete(req.id);
        return {
            message: "Şirket çalışma düzeni başarıyla silindi.",
            success: true
        };
    }
}
