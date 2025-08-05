
import { DataType, Table, Model, Column, PrimaryKey, AllowNull, ForeignKey, BelongsTo, HasOne } from "sequelize-typescript";
import { EmployeeModel } from "./EmployeesModel";
import { ROLE } from "../../../domain/enums/Roles";
interface UserAttributes {
    id: string,
    username: string,
    password: string,
    user_role: ROLE,
    employee_id: string,
    last_login: Date,
    is_active: boolean,
    created_at: Date,
    updated_at: Date,
}


@Table({tableName: "users", timestamps: false, underscored: true})
export class UserModel extends Model implements UserAttributes{
    @PrimaryKey
    @AllowNull(false)
    @Column({type: DataType.STRING}) id!: string

    @AllowNull(false)
    @Column({type: DataType.STRING}) username!: string

    @AllowNull(false)
    @Column({type: DataType.STRING}) password!: string

    @AllowNull(true)
    @Column({type: DataType.STRING}) user_role!: ROLE

    @ForeignKey(() => EmployeeModel)
    @AllowNull(true)
    @Column({type: DataType.STRING}) employee_id!: string
    @BelongsTo(() => EmployeeModel)
    employee!: EmployeeModel

    @AllowNull(true)
    @Column({type: DataType.DATE}) last_login!: Date;

    @AllowNull(false)
    @Column({type: DataType.BOOLEAN}) is_active!: boolean;

    @AllowNull(false)
    @Column({type: DataType.DATE}) created_at!: Date;

    @AllowNull(false)
    @Column({type: DataType.DATE}) updated_at!: Date;

}

