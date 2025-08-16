import { Company } from "./Companies";
import { BranchWorkflows } from "./BranchWorkflows";

export class CompanyBranches {
    constructor(
        private _id: string,
        private _name: string,
        private _country: string,
        private _city: string,
        private _district: string,
        private _address: string,
        private _phone: string,
        private _tax_number: string,
        private _company: Company,
        private _branch_workflow: BranchWorkflows | undefined,
        private _created_at: Date,
        private _updated_at: Date,
    ) {}

    get id(): string { return this._id; }
    get name(): string { return this._name; }
    get country(): string { return this._country; }
    get city(): string { return this._city; }
    get district(): string { return this._district; }
    get address(): string { return this._address; }
    get phone(): string { return this._phone; }
    get tax_number(): string { return this._tax_number; }
    get company(): Company { return this._company; }
    get branch_workflow(): BranchWorkflows | undefined { return this._branch_workflow; }
    get created_at(): Date { return this._created_at; }
    get updated_at(): Date { return this._updated_at; }

    set updateName(name: string) {
        if (name) {
            this._name = name;
            this._updated_at = new Date();
        }
    }

    set updateCountry(country: string) {
        if (country) {
            this._country = country;
            this._updated_at = new Date();
        }
    }

    set updateCity(city: string) {
        if (city) {
            this._city = city;
            this._updated_at = new Date();
        }
    }

    set updateDistrict(district: string) {
        if (district) {
            this._district = district;
            this._updated_at = new Date();
        }
    }

    set updateAddress(address: string) {
        if (address) {
            this._address = address;
            this._updated_at = new Date();
        }
    }

    set updatePhone(phone: string) {
        if (phone) {
            this._phone = phone;
            this._updated_at = new Date();
        }
    }

    set updateTaxNumber(tax_number: string) {
        if (tax_number) {
            this._tax_number = tax_number;
            this._updated_at = new Date();
        }
    }

    set updateBranchWorkflow(branch_workflow: BranchWorkflows) {
        if (branch_workflow) {
            this._branch_workflow = branch_workflow;
            this._updated_at = new Date();
        }
    }

    static catchData(data: {
        id: string,
        company: Company,
        name: string,
        country: string,
        city: string,
        district: string,
        address: string,
        phone: string,
        tax_number: string,
        branch_workflow: BranchWorkflows | undefined,
        created_at: Date,
        updated_at: Date,
    }): CompanyBranches {
        return new CompanyBranches(
            data.id,     
            data.name,
            data.country,
            data.city,
            data.district,
            data.address,
            data.phone,
            data.tax_number,
            data.company,
            data.branch_workflow,
            data.created_at,
            data.updated_at,
        );
    }

    static async createCompanyBranch(
        
        name: string,
        country: string,
        city: string,
        district: string,
        address: string,
        phone: string,
        tax_number: string,
        company: Company,
        branch_workflow: BranchWorkflows | undefined,
    ): Promise<CompanyBranches> {
        const id = this.generateId();
        const created_at = new Date();
        const updated_at = new Date();
        return new CompanyBranches(
            id,   
            name,
            country,
            city,
            district,
            address,
            phone,
            tax_number,
            company,
            branch_workflow,
            created_at,
            updated_at,
        );
    }

    private static generateId(): string {
        return "branch_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(16);
    }
}
