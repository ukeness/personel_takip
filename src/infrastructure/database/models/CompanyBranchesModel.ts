import { DataType, Table, Model, Column, PrimaryKey, AllowNull, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { CompanyModel } from "./CompanyModel";
import { BranchWorkflowsModel } from "./BranchWorkflowsModel";

@Table({tableName: "company_branches", timestamps: true, underscored:false})
export class CompanyBranchesModel extends Model{
    @PrimaryKey
    @AllowNull(false)
    @Column({type: DataType.STRING}) id!: string;

    @AllowNull(false)
    @Column({type: DataType.STRING}) name!: string;

    @AllowNull(false)
    @Column({type: DataType.STRING}) country!: string;

    @AllowNull(false)
    @Column({type: DataType.STRING}) city!: string;

    @AllowNull(false)
    @Column({type: DataType.STRING}) district!: string;

    @AllowNull(false)
    @Column({type: DataType.STRING}) address!: string;

    @AllowNull(false)
    @Column({type: DataType.STRING}) phone!: string;

    @AllowNull(false)
    @Column({type: DataType.STRING}) tax_number!: string;

    @ForeignKey(() => CompanyModel)
    @AllowNull(false)
    @Column({type: DataType.STRING}) company_id!: string;
    @BelongsTo(() => CompanyModel)
    company!: CompanyModel

    @AllowNull(false)
    @Column({type: DataType.DATE}) created_at!: Date;

    @AllowNull(true)
    @Column({type: DataType.DATE}) updated_at!: Date;

    @HasMany(() => BranchWorkflowsModel)
    branch_workflows!: BranchWorkflowsModel;
}