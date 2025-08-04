import { EmployeePositions } from "./EmployeePositions"

export class Employees{
    constructor(
        private _id: string,
        private _name: string,
        private _surname: string,
        private _country: string,
        private _city: string,
        private _district: string,
        private _address: string,
        private _email: string,
        private _phone: string,
        private _position: EmployeePositions,
        private _birth_date: Date,
        private _gender: string,
        private _national_id: string,
        private _created_at: Date,
        private _updated_at: Date,

    ){}

    get id(): string { return this._id}
    get name(): string { return this._name}
    get surname(): string { return this._surname}
    get country(): string { return this._country}
    get city(): string { return this._city}
    get district(): string { return this._district}
    get address(): string { return this._address}
    get email(): string { return this._email}
    get phone(): string { return this._phone}
    get position(): EmployeePositions { return this._position }
    get birth_date(): Date { return this._birth_date}
    get gender(): string { return this._gender}
    get national_id(): string { return this._national_id}
    get created_at(): Date { return this._created_at}
    get updated_at(): Date { return this._updated_at}

    set updateName(name: string) {
        if (name) {
            this._name = name;
            this._updated_at = new Date();
        }
    }

    set updateSurname(surname: string) {
        if (surname) {
            this._surname = surname;
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

    set updatePosition(position: EmployeePositions) {
        if (position) {
            this._position = position;
            this._updated_at = new Date();
        }
    }

    set updateBirthDate(birth_date: Date) {
        if (birth_date) {
            this._birth_date = birth_date;
            this._updated_at = new Date();
        }
    }

    set updateGender(gender: string) {
        if (gender) {
            this._gender = gender;
            this._updated_at = new Date();
        }
    }

    set updateNationalId(national_id: string) {
        if (national_id) {
            this._national_id = national_id;
            this._updated_at = new Date();
        }
    }

    static async catchData(data: {
        id: string,
        name: string,
        surname: string,
        country: string,
        city: string,
        district: string,
        address: string,
        email: string,
        phone: string,
        position: EmployeePositions,
        birth_date: Date,
        gender: string,
        national_id: string,
        created_at: Date,
        updated_at: Date,
    }
    ): Promise<Employees>{
        return new Employees(
            data.id,
            data.name,
            data.surname,
            data.country,
            data.city,
            data.district,
            data.address,
            data.email,
            data.phone,
            data.position,
            data.birth_date,
            data.gender,
            data.national_id,
            data.created_at,
            data.updated_at,
        )
    }

    static async createEmployee(
        name: string,
        surname: string,
        country: string,
        city: string,
        district: string,
        address: string,
        email: string,
        phone: string,
        position: EmployeePositions,
        birth_date: Date,
        gender: string,
        national_id: string,
    ): Promise<Employees>{
        const id = this.generateId()
        const created_at: Date = new Date();
        const updated_at: Date = new Date();
        return new Employees(id,name,surname,country,city,district,address,email,phone,position,birth_date,gender,national_id,created_at,updated_at)
    }

    private static generateId(){
        return "employee_" + Math.random().toString(36).substring(2,15) + Date.now().toString(16);
    }
}