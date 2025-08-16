import { BranchWorkflows } from "../../../../domain/entities/BranchWorkflows";
import { IMainRepository } from "../../../../application/repositories/IMainRepository";
import { BranchWorkflowsModel } from "../../models/BranchWorkflowsModel";

export class BranchWorkflowsRepository implements IMainRepository<BranchWorkflows>{

    async toDomain(response: BranchWorkflowsModel): Promise<BranchWorkflows>{
        return BranchWorkflows.catchData({
            id: response.id,
            name: response.name,
            shift_start: response.shift_start,
            shift_end: response.shift_end,
            break_start: response.break_start,
            break_end: response.break_end,
            overtime_allowed: response.overtime_allowed,
            is_active: response.is_active,
            created_at: response.created_at,
            updated_at: response.updated_at,
        })
    }
    async create(data: BranchWorkflows): Promise<BranchWorkflows>{
        try{
            const response = await BranchWorkflowsModel.create({
                shift_start: data.shift_start,
                shift_end: data.shift_end,
                break_start: data.break_start,
                break_end: data.break_end,
                overtime_allowed: data.overtime_allowed,
            })
            if(!response) throw new Error("Şube çalışma düzeni oluşturulamadı")
            return await this.toDomain(response);
        }catch(error: any){
            console.log("BranchWorkflowsRepository.create: ", error);
            throw new Error(`Şube çalışma düzeni oluşturuken hata: ${error.message}`);
        }
    }
    async update(id: string, data: BranchWorkflows): Promise<boolean>{
        try{
        const position = await BranchWorkflowsModel.findByPk(id)
        if(!position) throw new Error("Güncellenecek şube çalışma düzeni bulunamadı");
        const [affectedCount] = await BranchWorkflowsModel.update(data, { where: {id: id}});
        if(affectedCount === 0 ) throw new Error("Şube çalışma düzeni güncellenemedi");
        return true;
        }catch(error: any){
            console.log("BranchWorkflowsRepository.update: ", error);
            throw new Error(`Şube çalışma düzeni güncellerken hata: ${error.message}`);
        }
    }
    async delete(id: string):Promise<boolean>{
        try{
            const response = await BranchWorkflowsModel.destroy({where: {id: id}});
            if(!response) throw new Error("Şube çalışma düzeni silinemedi");
            return true;
        }catch(error: any){
            console.log("BranchWorkflowsRepository.destroy: ", error);
            throw new Error(`Şube çalışma düzeni silinirken hata: ${error.message}`);
        }
    }
    async findById(id: string):Promise<BranchWorkflows>{
        try{
            const response = await BranchWorkflowsModel.findByPk(id);
            if(!response) throw new Error("Şube çalışma düzeni bulunmadı");
            return this.toDomain(response);
        }catch(error: any){
            console.log("BranchWorkflowsRepository.findById: ", error);
            throw new Error(`Şube çalışma düzeni id ile bulunurken hata: ${error.message}`);
        }
    }
    findAll(): Promise<BranchWorkflows[]> {
        throw new Error("Method not implemented.");
    }
    findByName(name: string): Promise<BranchWorkflows> {
        throw new Error("Method not implemented.");
    }
    findByEmail(email: string): Promise<BranchWorkflows> {
        throw new Error("Method not implemented.");
    }

}