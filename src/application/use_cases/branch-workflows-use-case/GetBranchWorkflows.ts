import { BranchWorkflows } from "../../../domain/entities/BranchWorkflows";
import { IMainRepository } from "../../repositories/IMainRepository";

interface GetBranchWorkflowsRequest {
    id: string;
}

interface GetBranchWorkflowsResponse {
    companyWorkflows: BranchWorkflows | null;
}

export class GetCompanyWorkflows {
    constructor(private repository: IMainRepository<BranchWorkflows>) {}

    async execute(req: GetBranchWorkflowsRequest): Promise<GetBranchWorkflowsResponse> {
        const companyWorkflows = await this.repository.findById(req.id);
        return {
            companyWorkflows
        };
    }
}
