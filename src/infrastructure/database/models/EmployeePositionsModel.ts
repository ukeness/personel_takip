import { DataType,Table,Model, Column, AllowNull, PrimaryKey, HasMany } from "sequelize-typescript";
import { EmployeePositions } from "../../../domain/entities/EmployeePositions";
import { POSITION } from "../../../domain/enums/Positions";
import { EmployeeModel } from "./EmployeeModel";

interface EmployeePositionAttributes{
    id: string,
    position: POSITION,
    created_at: Date,
    updated_at: Date,
    note?: string,
}

@Table({tableName: "employee_positions", timestamps: false, underscored:false})
export class EmployeePositionModel extends Model<EmployeePositions>{

    @PrimaryKey
    @AllowNull(false)
    @Column({type: DataType.STRING}) id!: string

    @AllowNull(false)
    @Column({type: DataType.STRING}) position!: POSITION

    @AllowNull(true)
    @Column({type: DataType.STRING}) note!: string

    @AllowNull(false)
    @Column({type: DataType.DATE}) created_at!: Date

    @AllowNull(true)
    @Column({type: DataType.DATE}) updated_at!: Date

    @HasMany(() => EmployeeModel)
    employees!: EmployeeModel[];
}