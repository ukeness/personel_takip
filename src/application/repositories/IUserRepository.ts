export interface IUserRepository<T> {
    create(data: T): Promise<T>
    update(id: string,data: Partial<T>): Promise<void>
    findById(id: string): Promise<T | null>
    findByName(name: string): Promise<T | null>
    findByEmail(email: string): Promise<T | null>
    findAll(data: T): Promise<T[]>
    delete(id: string): Promise<boolean>
}