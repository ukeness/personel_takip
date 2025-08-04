import { EmployeePositions } from "../../../../domain/entities/EmployeePositions";
import { IMainRepository } from "../../../../application/repositories/IMainRepository";
import { EmployeePositionModel } from "../../models/EmployeePositionsModel";
import { POSITION } from "../../../../domain/enums/Positions";
import { ALL } from "dns";

export class EmployeePositionsRepository implements Partial<IMainRepository<EmployeePositions>>{

    async toDomain(response: EmployeePositionModel): Promise<EmployeePositions>{
        return EmployeePositions.catchData({
            id: response.id,
            position: response.position,
            note: response.note,
            created_at: response.created_at,
            updated_at: response.updated_at,
        })
    }
    async create(data: EmployeePositions): Promise<EmployeePositions>{
        try{
            const response = await EmployeePositionModel.create(data)
            if(!response) throw new Error("Çalışan pozisyonu oluşturulamadı")
            return await this.toDomain(response);
        }catch(error: any){
            console.log("EmployeePositionRepository.create: ", error);
            throw new Error(`Çalışan pozisyonu oluşturuken hata: ${error.message}`);
        }
    }
    async update(id: string, data: EmployeePositions): Promise<boolean>{
        try{
        const position = await EmployeePositionModel.findByPk(id)
        if(!position) throw new Error("Güncellenecek çalışan pozisyonu bulunamadı");
        const [affectedCount] = await EmployeePositionModel.update(data, { where: {id: id}});
        if(affectedCount === 0 ) throw new Error("Çalışan pozisyonu güncellenemedi");
        return true;
        }catch(error: any){
            console.log("EmployeePositionRepository.update: ", error);
            throw new Error(`Çalışan pozisyonu güncellerken hata: ${error.message}`);
        }
    }
    async delete(id: string):Promise<boolean>{
        try{
            const response = await EmployeePositionModel.destroy({where: {id: id}});
            if(!response) throw new Error("Calışan pozisyonu silinemedi");
            return true;
        }catch(error: any){
            console.log("EmployeePositionRepository.destroy: ", error);
            throw new Error(`Çalışan pozisyonu silinirken hata: ${error.message}`);
        }
    }
    async findbyId(id: string):Promise<EmployeePositions>{
        try{
            const response = await EmployeePositionModel.findByPk(id);
            if(!response) throw new Error("Çalışan Pozisyonu bulunmadı");
            return this.toDomain(response);
        }catch(error: any){
            console.log("EmployeePositionRepository.findById: ", error);
            throw new Error(`Çalışan pozisyonu id ile bulunurken hata: ${error.message}`);
        }
    }
    async findByName(position: POSITION):Promise<EmployeePositions>{
        try{
            const response = await EmployeePositionModel.findOne({where: {position: position}});
            if(!response) throw new Error("Çalışan Pozisyonu bulunmadı");
            return this.toDomain(response);
        }catch(error: any){
            console.log("EmployeePositionRepository.findByName: ", error);
            throw new Error(`Çalışan pozisyonu isim ile bulunurken hata: ${error.message}`);
        }
    }


}