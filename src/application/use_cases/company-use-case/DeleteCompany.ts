import { Company } from "../../../domain/entities/Companies";
import { IMainRepository } from "../../repositories/IMainRepository";

interface DeleteCompanyRequest {
    id: string;
}

interface DeleteCompanyResponse {
    message: string;
    success: boolean;
}

export class DeleteCompany {
    constructor(private repository: IMainRepository<Company>) {}

    async execute(req: DeleteCompanyRequest): Promise<DeleteCompanyResponse> {
        await this.repository.delete(req.id);
        return {
            message: "Şirket başarıyla silindi.",
            success: true
        };
    }
}
