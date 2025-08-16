import { Company } from "../../../domain/entities/Companies";
import { IMainRepository } from "../../repositories/IMainRepository";

interface GetCompanyRequest {
    id: string;
}

interface GetCompanyResponse {
    company: Company | null;
}

export class GetCompany {
    constructor(private repository: IMainRepository<Company>) {}

    async execute(req: GetCompanyRequest): Promise<GetCompanyResponse> {
        const company = await this.repository.findById(req.id);
        return {
            company
        };
    }
}
