export interface IPasswordHashService{
    hashPassword(password: string): string;
    comparePassword(password: string, hashedPassword: string): boolean;
}
