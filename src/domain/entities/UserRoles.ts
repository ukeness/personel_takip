import { ROLE } from "../enums/RoleTypes"
export class UserRoles {
    constructor(
        private _id: string,
        private _role: ROLE,
        private _note: string | undefined,
        private _created_at: Date,
        private _updated_at: Date,
        
    ){}
    get id(): string { return this._id }
    get role(): string { return this._role }
    get note(): string | undefined { return this._note }
    get created_at(): Date {return this._created_at}
    get updated_at(): Date {return this._updated_at}

    set updateRole(newRole: ROLE){
        this._role = newRole;
        this._updated_at = new Date();
    }
    set updateNote(newNote: string){
        this._note = newNote;
        this._updated_at = new Date();
    }

    static catchData(data: {
        id: string,
        role: ROLE,
        created_at: Date,
        updated_at: Date,
        note: string,
    }): UserRoles{
        return new UserRoles(
            data.id,
            data.role,
            data.note,
            data.created_at,
            data.updated_at,
            
        )
    }

    static async createRole(
        role: ROLE,
        note: string | undefined
    ):Promise<UserRoles>{
        const id = this.generateId();
        const created_at = new Date();
        const updated_at = new Date();
        return new UserRoles(id,role,note,created_at,updated_at)
    }

    private static generateId(){
        return "role_" + Math.random().toString(36).substring(2,15) + Date.now().toString(16);
    }
}

