import { ROLE } from "../enums/RoleTypes"
export class UserRoles {
    constructor(
        private _id: string,
        private _role: ROLE,
        private _note: string,
    ){}
    get id(): string { return this._id }
    get role(): string { return this._role }
    get note(): string { return this._note }
}