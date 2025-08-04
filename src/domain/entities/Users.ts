import { UserRoles } from "./UserRoles"; 
import { Employees } from "./Employees";
export class Users {
    constructor(
        private _id: string,
        private _username: string,
        private _password: string,
        private _employee: Employees | undefined,
        private _user_role: UserRoles,
        private _is_active: boolean,
        private _last_login: Date,
        private _created_at: Date,
        private _updated_at: Date,

    ){}
    get id(): string { return this._id };
    get username(): string { return this._username };
    get password(): string { return this._password };
    get user_role(): UserRoles | undefined { return this._user_role };
    get employee(): Employees | undefined { return this._employee };
    get last_login(): Date | undefined { return this._last_login };
    get is_active(): boolean { return this._is_active };
    get created_at(): Date { return this._created_at };
    get updated_at(): Date { return this._updated_at};

    set updateName(newUserName: string){
        if(newUserName) this._username = newUserName;
        this._updated_at = new Date();
    }
    set updatePassword(newPassword: string){
        if(newPassword) this._password = newPassword;
        this._updated_at = new Date();
    }
    set updateUserRole(newRole: UserRoles){
        if(newRole) this._user_role = newRole;
    }
    set updateIsActive(req: boolean){
        if(req != null) this._is_active = req;
    }
    set updateLastLogin(req: Date){
        if(req) this._last_login = req;
    }

    static catchData(data: {
        id: string,
        username: string,
        password: string,
        employee: Employees | undefined,
        user_role: UserRoles,
        is_active: boolean,
        last_login: Date,
        created_at: Date,
        updated_at: Date,
    }
    ): Users{
        return new Users(
            data.id,
            data.username,
            data.password,
            data.employee,
            data.user_role,
            data.is_active,
            data.last_login,
            data.created_at,
            data.updated_at,
        )
    }

    static async createUser(
        username: string,
        password: string,
        user_role: UserRoles,
        employee?: Employees,
    ): Promise<Users>{
        const id: string = this.generateId();
        const is_active: boolean = false;
        const last_login: Date = new Date();
        const created_at: Date = new Date();
        const updated_at: Date = new Date();
        return new Users(id,username,password,employee,user_role,is_active,last_login,created_at,updated_at)
    }
    private static generateId(){
        return "user_" + Math.random().toString(36).substring(2,15) + Date.now().toString(16);
    }
    validate(){
        
    }
}