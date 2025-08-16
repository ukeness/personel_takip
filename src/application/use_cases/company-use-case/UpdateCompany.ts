import { Company } from "../../../domain/entities/Companies";
import { IMainRepository } from "../../repositories/IMainRepository";

interface UpdateCompanyRequest {
    id: string;
    name?: string;
    country?: string;
    city?: string;
    district?: string;
    address?: string;
    email?: string;
    phone?: string;
    phone2?: string;
    website?: string;
    founded_date?: Date;
    tax_number?: string;
    sector?: string;
    status?: string;
}

interface UpdateCompanyResponse {
    message: string;
    success: boolean;
}

export class UpdateCompany {
    constructor(private repository: IMainRepository<Company>) {}

    async execute(req: UpdateCompanyRequest): Promise<UpdateCompanyResponse> {
        const company = await this.repository.findById(req.id);
        if (!company) {
            throw new Error("Şirket bulunamadı.");
        }

        if (req.name) company.updateName = req.name;
        if (req.country) company.updateCountry = req.country;
        if (req.city) company.updateCity = req.city;
        if (req.district) company.updateDistrict = req.district;
        if (req.address) company.updateAddress = req.address;
        if (req.email) company.updateEmail = req.email;
        if (req.phone) company.updatePhone = req.phone;
        if (req.phone2) company.updatePhone2 = req.phone2;
        if (req.website) company.updateWebsite = req.website;
        if (req.founded_date) company.updateFoundedDate = req.founded_date;
        if (req.tax_number) company.updateTaxNumber = req.tax_number;
        if (req.sector) company.updateSector = req.sector;
        if (req.status) company.updateStatus = req.status;

        await this.repository.update(company.id,company);

        return {
            message: "Şirket başarıyla güncellendi.",
            success: true
        };
    }
}
