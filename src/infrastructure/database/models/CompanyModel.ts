import { DataType,Table,Model, Column, AllowNull, PrimaryKey, HasMany } from "sequelize-typescript";
import { CompanyBranchesModel } from "./CompanyBranchesModel";

@Table({tableName: "companies", timestamps: true, underscored:false})
export class CompanyModel extends Model{

    @PrimaryKey
    @AllowNull(false)
    @Column({type: DataType.STRING}) id!: string

    @AllowNull(false)
    @Column({type: DataType.STRING}) name!: string

    @AllowNull(false)
    @Column({type: DataType.STRING}) country!: string

    @AllowNull(false)
    @Column({type: DataType.STRING}) city!: string

    @AllowNull(false)
    @Column({type: DataType.STRING}) district!: string

    @AllowNull(false)
    @Column({type: DataType.STRING}) address!: string

    @AllowNull(false)
    @Column({type: DataType.STRING}) email!: string

    @AllowNull(false)
    @Column({type: DataType.STRING}) phone!: string

    @AllowNull(true)
    @Column({type: DataType.STRING}) phone2!: string

    @AllowNull(true)
    @Column({type: DataType.STRING}) website!: string

    @AllowNull(false)
    @Column({type: DataType.DATE}) founded_date!: Date

    @AllowNull(false)
    @Column({type: DataType.STRING}) tax_number!: string

    @AllowNull(false)
    @Column({type: DataType.STRING}) sector!: string

    @AllowNull(false)
    @Column({type: DataType.STRING}) status!: string

    @AllowNull(false)
    @Column({type: DataType.DATE}) created_at!: Date

    @AllowNull(true)
    @Column({type: DataType.DATE}) updated_at!: Date

    @HasMany(() => CompanyBranchesModel)
    company_branches!: CompanyBranchesModel[];
}