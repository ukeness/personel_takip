import { Company } from "../../../../domain/entities/Companies";
import { IMainRepository } from "../../../../application/repositories/IMainRepository";
import { CompanyModel } from "../../models/CompanyModel";

export class CompanyRepository implements IMainRepository<Company>{

    async toDomain(response: CompanyModel): Promise<Company>{
        return Company.catchData({
            id: response.id,
            name: response.name,
            country: response.country,
            city: response.city,
            district: response.district,
            address: response.address,
            email: response.email,
            phone: response.phone,
            phone2: response.phone2,
            website: response.website,
            founded_date: response.founded_date,
            tax_number: response.tax_number,
            sector: response.sector,
            status: response.status,
            created_at: response.created_at,
            updated_at: response.updated_at,
        })
    }
    async create(data: Company): Promise<Company>{
        try{
            const response = await CompanyModel.create({
                
            })
            if(!response) throw new Error("Şirket oluşturulamadı")
            return await this.toDomain(response);
        }catch(error: any){
            console.log("CompanyRepository.create: ", error);
            throw new Error(`Şirket oluşturuken hata: ${error.message}`);
        }
    }
    async update(id: string, data: Company): Promise<boolean>{
        try{
        const position = await CompanyModel.findByPk(id)
        if(!position) throw new Error("Güncellenecek şirket bulunamadı");
        const [affectedCount] = await CompanyModel.update(data, { where: {id: id}});
        if(affectedCount === 0 ) throw new Error("Şirket güncellenemedi");
        return true;
        }catch(error: any){
            console.log("CompanyRepository.update: ", error);
            throw new Error(`Şirket güncellerken hata: ${error.message}`);
        }
    }
    async delete(id: string):Promise<boolean>{
        try{
            const response = await CompanyModel.destroy({where: {id: id}});
            if(!response) throw new Error("Şirket silinemedi");
            return true;
        }catch(error: any){
            console.log("CompanyRepository.destroy: ", error);
            throw new Error(`Şirket silinirken hata: ${error.message}`);
        }
    }
    async findById(id: string):Promise<Company>{
        try{
            const response = await CompanyModel.findByPk(id);
            if(!response) throw new Error("Şirket bulunmadı");
            return this.toDomain(response);
        }catch(error: any){
            console.log("CompanyRepository.findById: ", error);
            throw new Error(`Şirket id ile bulunurken hata: ${error.message}`);
        }
    }
    findByName(name: string): Promise<Company> {
        throw new Error("Method not implemented.");
    }
    findByEmail(email: string): Promise<Company> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Company[]> {
        throw new Error("Method not implemented.");
    }
}