export interface IAuthUserService<T>{
    authenticateUser(username: string, password: string): Promise<Partial<T>>;
    authorizeUser(): any;
}