import { CompanyBranches } from "../../../domain/entities/CompanyBranches";
import { IMainRepository } from "../../repositories/IMainRepository";
import { Company } from "../../../domain/entities/Companies";
import { BranchWorkflows } from "../../../domain/entities/BranchWorkflows";

interface CreateCompanyBranchesRequest {
    company: Company;
    name: string;
    country: string;
    city: string;
    district: string;
    address: string;
    phone: string;
    tax_number: string;
    branch_workflow: BranchWorkflows;
}

interface CreateCompanyBranchesResponse {
    message: string;
    success: boolean;
}

export class CreateCompanyBranches {
    constructor(private repository: IMainRepository<CompanyBranches>) {}

    async execute(req: CreateCompanyBranchesRequest): Promise<CreateCompanyBranchesResponse> {
        const companyBranches = await CompanyBranches.createCompanyBranch(
            req.name,
            req.country,
            req.city,
            req.district,
            req.address,
            req.phone,
            req.tax_number,
            req.company,
            req.branch_workflow,
        );
        await this.repository.create(companyBranches);
        return {
            message: "Şirket şubesi başarıyla oluşturuldu.",
            success: true
        };
    }
}
