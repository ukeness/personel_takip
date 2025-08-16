import { DataType,Table,Model, Column, AllowNull, PrimaryKey, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { CompanyBranchesModel } from "./CompanyBranchesModel";

@Table({tableName: "branch_workflows", timestamps: true, underscored:false})
export class BranchWorkflowsModel extends Model{

    @PrimaryKey
    @AllowNull(false)
    @Column({type: DataType.STRING}) id!: string;

    @AllowNull(false)
    @Column({type: DataType.STRING}) name!: string;

    @AllowNull(false)
    @Column({type: DataType.DATE}) shift_start!: Date;

    @AllowNull(false)
    @Column({type: DataType.DATE}) shift_end!: Date;

    @AllowNull(false)
    @Column({type: DataType.DATE}) break_start!: Date;

    @AllowNull(false)
    @Column({type: DataType.DATE}) break_end!: Date;

    @AllowNull(false)
    @Column({type: DataType.BOOLEAN}) overtime_allowed!: boolean;

    @AllowNull(false)
    @Column({type: DataType.BOOLEAN}) is_active!: boolean;

    @ForeignKey(() => CompanyBranchesModel)
    @AllowNull(true)
    @Column({type: DataType.STRING,}) branch_id!: CompanyBranchesModel
    @BelongsTo(() => CompanyBranchesModel)
    company_branch!: CompanyBranchesModel
    
    @AllowNull(false)
    @Column({type: DataType.DATE}) created_at!: Date;

    @AllowNull(true)
    @Column({type: DataType.DATE}) updated_at!: Date;
}