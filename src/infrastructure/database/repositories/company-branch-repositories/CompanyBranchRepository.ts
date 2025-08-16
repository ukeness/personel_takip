import { CompanyBranches } from "../../../../domain/entities/CompanyBranches";
import { IMainRepository } from "../../../../application/repositories/IMainRepository";
import { CompanyBranchesModel } from "../../models/CompanyBranchesModel";
import { BranchWorkflows } from "../../../../domain/entities/BranchWorkflows";
import { CompanyModel } from "../../models/CompanyModel";
import { Company } from "../../../../domain/entities/Companies";

export class CompanyBranchesRepository implements IMainRepository<CompanyBranches>{

    async toDomain(response: CompanyBranchesModel): Promise<CompanyBranches>{
        return CompanyBranches.catchData({
            id: response.id,
            name: response.name,
            country: response.country,
            city: response.city,
            district: response.district,
            address: response.address,
            phone: response.phone,
            tax_number: response.tax_number,
            company: Company.catchData(response.company),
            branch_workflow: BranchWorkflows.catchData(response.branch_workflows),
            created_at: response.created_at,
            updated_at: response.updated_at,
        })
    }
    async create(data: CompanyBranches): Promise<CompanyBranches>{
        try{
            const response = await CompanyBranchesModel.create({
                id: data.id,
                name: data.name,
                country: data.country,
                city: data.city,
                district: data.district,
                address: data.address,
                phone: data.phone,
                tax_number: data.tax_number,
                company_id: data.company.id,
                branch_workflow_id: data.branch_workflow?.id,
                created_at: data.created_at,
                updated_at: data.updated_at,
            })
            if(!response) throw new Error("Şube oluşturulamadı")
            return await this.toDomain(response);
        }catch(error: any){
            console.log("CompanyBranchesRepository.create: ", error);
            throw new Error(`Şube oluşturuken hata: ${error.message}`);
        }
    }
    async update(id: string, data: CompanyBranches): Promise<boolean>{
        try{
        const position = await CompanyBranchesModel.findByPk(id)
        if(!position) throw new Error("Güncellenecek şube bulunamadı");
        const [affectedCount] = await CompanyBranchesModel.update(data, { where: {id: id}});
        if(affectedCount === 0 ) throw new Error("Şube güncellenemedi");
        return true;
        }catch(error: any){
            console.log("CompanyBranchesRepository.update: ", error);
            throw new Error(`Şube güncellerken hata: ${error.message}`);
        }
    }
    async delete(id: string):Promise<boolean>{
        try{
            const response = await CompanyBranchesModel.destroy({where: {id: id}});
            if(!response) throw new Error("Şube silinemedi");
            return true;
        }catch(error: any){
            console.log("CompanyBranchesRepository.destroy: ", error);
            throw new Error(`Şube silinirken hata: ${error.message}`);
        }
    }
    async findById(id: string):Promise<CompanyBranches>{
        try{
            const response = await CompanyBranchesModel.findByPk(id);
            if(!response) throw new Error("Şube bulunmadı");
            return this.toDomain(response);
        }catch(error: any){
            console.log("CompanyBranchesRepository.findById: ", error);
            throw new Error(`Şube id ile bulunurken hata: ${error.message}`);
        }
    }
    findByName(name: string): Promise<CompanyBranches> {
        throw new Error("Method not implemented.");
    }
    findByEmail(email: string): Promise<CompanyBranches> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<CompanyBranches[]> {
        throw new Error("Method not implemented.");
    }
}