export class EmployeePositions{
    constructor(
        private _id: string,
        private _position: string,
        private _note: string | undefined,
        private _created_at: Date,
        private _updated_at: Date,
 
    ){}

    get id(): string {return this._id }
    get position(): string {return this._position }
    get note(): string | undefined {return this._note }
    get created_at(): Date {return this._created_at }
    get updated_at(): Date {return this._updated_at }


    set UpdatePosition(newPosition: string){
        this._position = newPosition
    }
    set updateNote(newNote: string){
        this._note= newNote
    }

    static catchData(data: {
        id: string,
        position: string,
        note: string,
        created_at: Date,
        updated_at: Date,
    }): EmployeePositions{
        return new EmployeePositions(
            data.id,
            data.position,
            data.note,
            data.created_at,
            data.updated_at,
        )
    }

    static async createPosition(
        position: string,
        note: string | undefined,
    ): Promise<EmployeePositions>{
        const id = this.generateId();
        const created_at = new Date();
        const updated_at = new Date();
        return new EmployeePositions(
            id,
            position,
            note,
            created_at,
            updated_at
        )
    }

    private static generateId(){
        return "position_" + Math.random().toString(36).substring(2,15) + Date.now().toString(16);
    }
}