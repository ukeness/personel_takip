import { DataType, Table, Model, Column, PrimaryKey, AllowNull, ForeignKey, BelongsTo, HasOne } from "sequelize-typescript";
import { UserModel } from "./UsersModel";
import { EmployeePositionModel } from "./EmployeePositionsModel";


interface EmployeeAttributes {
    id: string,
    name: string,
    surname: string,
    country: string,
    city: string,
    district: string,
    address: string,
    email: string,
    phone: string,
    position: EmployeePositionModel,
    birth_date: Date,
    gender: string,
    national_id: string,
    companies_id: string,
}


@Table({tableName: "employees", timestamps: false, })
export class EmployeeModel extends Model implements EmployeeAttributes{
    @PrimaryKey
    @AllowNull(false)
    @Column({type: DataType.STRING}) id!: string

    @AllowNull(false)
    @Column({type: DataType.STRING}) name!: string

    @AllowNull(false)
    @Column({type: DataType.STRING}) surname!: string

    @AllowNull(true)
    @Column({type: DataType.STRING}) country!: string

    @AllowNull(true)
    @Column({type: DataType.STRING}) city!: string
    
    @AllowNull(true)
    @Column({type: DataType.STRING}) district!: string

    @AllowNull(true)
    @Column({type: DataType.STRING}) address!: string
    
    @AllowNull(false)
    @Column({type: DataType.STRING}) email!: string

    @AllowNull(true)
    @Column({type: DataType.STRING}) phone!: string

    @ForeignKey(() => EmployeePositionModel)
    @AllowNull(false)
    @Column({type: DataType.STRING}) position_id!: string
    @BelongsTo(() => EmployeePositionModel)
    position!: EmployeePositionModel

    @AllowNull(true)
    @Column({type: DataType.STRING}) birth_date!: Date

    @AllowNull(false)
    @Column({type: DataType.STRING}) gender!: string

    @AllowNull(true)
    @Column({type: DataType.STRING}) national_id!: string

    @AllowNull(true)
    @Column({type: DataType.STRING}) companies_id!: string

    @AllowNull(false)
    @Column({type: DataType.DATE}) created_at!: Date

    @AllowNull(false)
    @Column({type: DataType.DATE}) updated_at!: Date

    @HasOne(() => UserModel)
    users!: UserModel

}