export class BranchWorkflows {
    constructor(
        private _id: string,
        private _name: string,
        private _shift_start: Date,
        private _shift_end: Date,
        private _break_start: Date,
        private _break_end: Date,
        private _overtime_allowed: boolean,
        private _is_active: boolean,
        private _created_at: Date,
        private _updated_at: Date,
    ) {}

    get id(): string { return this._id; }
    get name(): string {return this._name}
    get shift_start(): Date { return this._shift_start; }
    get shift_end(): Date { return this._shift_end; }
    get break_start(): Date { return this._break_start; }
    get break_end(): Date { return this._break_end; }
    get overtime_allowed(): boolean { return this._overtime_allowed; }
    get is_active(): boolean { return this._is_active; }
    get created_at(): Date { return this._created_at; }
    get updated_at(): Date { return this._updated_at; }

    set updateName(name: string){
        this._name = name;
        this._updated_at = new Date();
    }

    set updateShiftStart(shift_start: Date) {
        if (shift_start) {
            this._shift_start = shift_start;
            this._updated_at = new Date();
        }
    }

    set updateShiftEnd(shift_end: Date) {
        if (shift_end) {
            this._shift_end = shift_end;
            this._updated_at = new Date();
        }
    }

    set updateBreakStart(break_start: Date) {
        if (break_start) {
            this._break_start = break_start;
            this._updated_at = new Date();
        }
    }

    set updateBreakEnd(break_end: Date) {
        if (break_end) {
            this._break_end = break_end;
            this._updated_at = new Date();
        }
    }

    set updateOvertimeAllowed(overtime_allowed: boolean) {
        if (overtime_allowed !== null && overtime_allowed !== undefined) {
            this._overtime_allowed = overtime_allowed;
            this._updated_at = new Date();
        }
    }

    static catchData(data: {
        id: string,
        name: string,
        shift_start: Date,
        shift_end: Date,
        break_start: Date,
        break_end: Date,
        overtime_allowed: boolean,
        is_active: boolean,
        created_at: Date,
        updated_at: Date,
    }): BranchWorkflows {
        return new BranchWorkflows(
            data.id,
            data.name,
            data.shift_start,
            data.shift_end,
            data.break_start,
            data.break_end,
            data.overtime_allowed,
            data.is_active,
            data.created_at,
            data.updated_at,
        );
    }

    static async createBranchWorkflow(
        name: string,
        shift_start: Date,
        shift_end: Date,
        break_start: Date,
        break_end: Date,
        overtime_allowed: boolean,
    ): Promise<BranchWorkflows> {
        const id = this.generateId();
        const is_active = false
        const created_at = new Date();
        const updated_at = new Date();
        return new BranchWorkflows(
            id,
            name,
            shift_start,
            shift_end,
            break_start,
            break_end,
            overtime_allowed,
            is_active,
            created_at,
            updated_at,
        );
    }

    private static generateId(): string {
        return "workflow_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(16);
    }
}
