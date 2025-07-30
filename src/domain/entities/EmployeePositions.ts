import { POSITION } from "../enums/Positions";
export class EmployeePositions{
    constructor(
        private _id: string,
        private _position: POSITION,
        private _note?: string
    ){}

    get id(): string {return this._id }
    get position(): POSITION {return this._position }
    get note(): string | undefined {return this._note }


    static async createPosition(
        position: POSITION,
        note: string,
    ): Promise<EmployeePositions>{
        const id = this.generateId();
        return new EmployeePositions(id,position,note)
    }

    private static generateId(){
        return "position_" + Math.random().toString(36).substring(2,15) + Date.now().toString(16);
    }
}