export interface IEmployeeRepository<T> {
    create(data: T): Promise<T>
    update(id: string,data: Partial<T>): Promise<void>
    findById(id: string): Promise<T>
    findByName(name: string): Promise<T>
    findByEmail(email: string): Promise<T>
    findAll(data: T): Promise<T[]>
    delete(id: string): Promise<boolean>
}