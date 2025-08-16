import { BranchWorkflows } from "./BranchWorkflows"

export class Company{
    constructor(
        private _id: string,
        private _name: string,
        private _country: string,
        private _city: string,
        private _district: string,
        private _address: string,
        private _email: string,
        private _phone: string,
        private _phone2: string,
        private _website: string,
        private _founded_date: Date,
        private _tax_number: string,
        private _sector: string,
        private _status: string,
        private _created_at: Date,
        private _updated_at: Date,
    ){}

    get id(): string { return this._id }
    get name(): string { return this._name }
    get country(): string { return this._country }
    get city(): string { return this._city }
    get district(): string { return this._district }
    get address(): string { return this._address }
    get email(): string { return this._email }
    get phone(): string { return this._phone }
    get phone2(): string { return this._phone2 }
    get website(): string { return this._website }
    get founded_date(): Date { return this._founded_date }
    get tax_number(): string { return this._tax_number }
    get sector(): string { return this._sector }
    get status(): string { return this._status }
    get created_at(): Date { return this._created_at }
    get updated_at(): Date { return this._updated_at }

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

    set updateEmail(email: string) {
        if (email) {
            this._email = email;
            this._updated_at = new Date();
        }
    }

    set updatePhone(phone: string) {
        if (phone) {
            this._phone = phone;
            this._updated_at = new Date();
        }
    }

    set updatePhone2(phone2: string) {
        if (phone2) {
            this._phone2 = phone2;
            this._updated_at = new Date();
        }
    }

    set updateWebsite(website: string) {
        if (website) {
            this._website = website;
            this._updated_at = new Date();
        }
    }

    set updateFoundedDate(founded_date: Date) {
        if (founded_date) {
            this._founded_date = founded_date;
            this._updated_at = new Date();
        }
    }

    set updateTaxNumber(tax_number: string) {
        if (tax_number) {
            this._tax_number = tax_number;
            this._updated_at = new Date();
        }
    }

    set updateSector(sector: string) {
        if (sector) {
            this._sector = sector;
            this._updated_at = new Date();
        }
    }

    set updateStatus(status: string) {
        if (status) {
            this._status = status;
            this._updated_at = new Date();
        }
    }

    static catchData(data: {
        id: string,
        name: string,
        country: string,
        city: string,
        district: string,
        address: string,
        email: string,
        phone: string,
        phone2: string,
        website: string,
        founded_date: Date,
        tax_number: string,
        sector: string,
        status: string,
        created_at: Date,
        updated_at: Date,
    }): Company {
        return new Company(
            data.id,
            data.name,
            data.country,
            data.city,
            data.district,
            data.address,
            data.email,
            data.phone,
            data.phone2,
            data.website,
            data.founded_date,
            data.tax_number,
            data.sector,
            data.status,
            data.created_at,
            data.updated_at,
        )
    }

    static async createCompany(
        name: string,
        country: string,
        city: string,
        district: string,
        address: string,
        email: string,
        phone: string,
        phone2: string,
        website: string,
        founded_date: Date,
        tax_number: string,
        sector: string,
        status: string,
    ): Promise<Company> {
        const id = this.generateId();
        const created_at = new Date();
        const updated_at = new Date();
        return new Company(
            id,
            name,
            country,
            city,
            district,
            address,
            email,
            phone,
            phone2,
            website,
            founded_date,
            tax_number,
            sector,
            status,
            created_at,
            updated_at,
        )
    }

    private static generateId() {
        return "company_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(16);
    }
}
