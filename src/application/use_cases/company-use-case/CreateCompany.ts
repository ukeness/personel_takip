import { Company } from "../../../domain/entities/Companies";
import { IMainRepository } from "../../repositories/IMainRepository";

interface CreateCompanyRequest {
    name: string;
    country: string;
    city: string;
    district: string;
    address: string;
    email: string;
    phone: string;
    phone2: string;
    website: string;
    founded_date: Date;
    tax_number: string;
    sector: string;
    status: string;
}

interface CreateCompanyResponse {
    message: string;
    success: boolean;
}

export class CreateCompany {
    constructor(private repository: IMainRepository<Company>) {}

    async execute(req: CreateCompanyRequest): Promise<CreateCompanyResponse> {
        const company = await Company.createCompany(
            req.name,
            req.country,
            req.city,
            req.district,
            req.address,
            req.email,
            req.phone,
            req.phone2,
            req.website,
            req.founded_date,
            req.tax_number,
            req.sector,
            req.status,
        );
        await this.repository.create(company);
        return {
            message: "Şirket başarıyla oluşturuldu.",
            success: true
        };
    }
}
