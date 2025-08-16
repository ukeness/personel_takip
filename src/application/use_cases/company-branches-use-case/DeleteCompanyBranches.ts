import { CompanyBranches } from "../../../domain/entities/CompanyBranches";
import { IMainRepository } from "../../repositories/IMainRepository";

interface DeleteCompanyBranchesRequest {
    id: string;
}

interface DeleteCompanyBranchesResponse {
    message: string;
    success: boolean;
}

export class DeleteCompanyBranches {
    constructor(private repository: IMainRepository<CompanyBranches>) {}

    async execute(req: DeleteCompanyBranchesRequest): Promise<DeleteCompanyBranchesResponse> {
        await this.repository.delete(req.id);
        return {
            message: "Şirket şubesi başarıyla silindi.",
            success: true
        };
    }
}
