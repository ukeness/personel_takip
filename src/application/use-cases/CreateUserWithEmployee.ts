
import { IMainRepository } from "../repositories/IMainRepository";
import { EmployeePositions } from "../../domain/entities/EmployeePositions";
import { Users } from "../../domain/entities/Users";
import { Employees } from "../../domain/entities/Employees";
import { sequelize } from "../../infrastructure/database/config/connect";
import { EmployeeRepository } from "../../infrastructure/database/repositories/employee-repositories/EmployeeRepository";
import { UserRepository } from "../../infrastructure/database/repositories/user-repositories/UserRepository";

// DTO (Data Transfer Object) for input
export interface CreateUserWithEmployeeDTO {
    username: string;
    password: string; // Raw password, should be hashed in the use case
    userRoleId: string;
    employeeData: {
        name: string,
        surname: string,
        country: string,
        city: string,
        district: string,
        address: string,
        email: string,
        phone: string,
        position: EmployeePositions,
        birth_date: Date,
        gender: string,
        national_id: string,
        companies_id: string,
        created_at: Date,
        updated_at: Date,  
    };
}

export class CreateUserWithEmployee {

    constructor(
        private employeeRepository: EmployeeRepository,
        private userRepository: UserRepository) {
    }

    async execute(data: CreateUserWithEmployeeDTO): Promise<Users> {
        const t = await sequelize.transaction();

        try {
            // 1. Create Employee
            const employeeEntity = Employees.create(
               name: data.employeeData.name,
               surname: data.employeeData.surname,
               country: data.employeeData.country,
               city: data.employeeData.city,
               district: data.employeeData.district,
               address: data.employeeData.address,
               email: data.employeeData.email,
               phone: data.employeeData.phone,
               position: data.employeeData.position,
               birth_date: data.employeeData.birth_date,
               gender: data.employeeData.gender,
               national_id: data.employeeData.national_id,
            );
            
            const newEmployee = await this.employeeRepository.create(employeeEntity, { transaction: t });

            // 2. Create User
            // Şifreyi burada hash'lemelisiniz! (e.g., using bcrypt)
            const userEntity = Users.create({
                username: data.username,
                password: data.password, // HASH THIS!
                employee: newEmployee,
                user_role: { id: data.userRoleId }, // Sadece ID'si yeterli
                is_active: true,
            });

            const newUser = await this.userRepository.create(userEntity, { transaction: t });

            // Her şey yolundaysa, transaction'ı onayla
            await t.commit();

            return newUser;

        } catch (error) {
            // Bir hata olursa, tüm değişiklikleri geri al
            await t.rollback();
            
            console.error("Error in CreateUserWithEmployee use case: ", error);
            throw new Error("Failed to create user with employee.");
        }
    }
}
