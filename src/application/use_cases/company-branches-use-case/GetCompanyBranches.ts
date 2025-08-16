import { CompanyBranches } from "../../../domain/entities/CompanyBranches";
import { IMainRepository } from "../../repositories/IMainRepository";

interface GetCompanyBranchesRequest {
    id: string;
}

interface GetCompanyBranchesResponse {
    companyBranches: CompanyBranches | null;
}

export class GetCompanyBranches {
    constructor(private repository: IMainRepository<CompanyBranches>) {}

    async execute(req: GetCompanyBranchesRequest): Promise<GetCompanyBranchesResponse> {
        const companyBranches = await this.repository.findById(req.id);
        return {
            companyBranches
        };
    }
}
