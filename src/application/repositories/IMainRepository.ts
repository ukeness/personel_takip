import { Model } from "sequelize"

export interface IMainRepository<T> {
    toDomain(Model: Model): Promise<T>
    create(data: T): Promise<T>
    update(id: string,data: Partial<T>): Promise<boolean>
    delete(id: string): Promise<boolean>
    findById(id: string): Promise<T>
    findByName(name: string): Promise<T>
    findByEmail(email: string): Promise<T>
    findAll(): Promise<T[]>

    
}