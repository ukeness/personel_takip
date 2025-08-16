import { CompanyBranches } from "../../../domain/entities/CompanyBranches";
import { IMainRepository } from "../../repositories/IMainRepository";
import { BranchWorkflows } from "../../../domain/entities/BranchWorkflows";

interface UpdateCompanyBranchesRequest {
    id: string;
    name?: string;
    country?: string;
    city?: string;
    district?: string;
    address?: string;
    phone?: string;
    tax_number?: string;
    branch_workflow?: BranchWorkflows;
}

interface UpdateCompanyBranchesResponse {
    message: string;
    success: boolean;
}

export class UpdateCompanyBranches {
    constructor(private repository: IMainRepository<CompanyBranches>) {}

    async execute(req: UpdateCompanyBranchesRequest): Promise<UpdateCompanyBranchesResponse> {
        const companyBranches = await this.repository.findById(req.id);
        if (!companyBranches) {
            throw new Error("Şirket şubesi bulunamadı.");
        }

        if (req.name) companyBranches.updateName = req.name;
        if (req.country) companyBranches.updateCountry = req.country;
        if (req.city) companyBranches.updateCity = req.city;
        if (req.district) companyBranches.updateDistrict = req.district;
        if (req.address) companyBranches.updateAddress = req.address;
        if (req.phone) companyBranches.updatePhone = req.phone;
        if (req.tax_number) companyBranches.updateTaxNumber = req.tax_number;
        if (req.branch_workflow) companyBranches.updateBranchWorkflow = req.branch_workflow;

        await this.repository.update(companyBranches.id,companyBranches);

        return {
            message: "Şirket şubesi başarıyla güncellendi.",
            success: true
        };
    }
}
