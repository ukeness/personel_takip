import { table } from "console";
import { DataType, Table, Model, PrimaryKey, AllowNull, Column} from "sequelize-typescript";
import { ROLE } from "../../../domain/enums/RoleTypes";

interface UserRoleModelAttributes {
    id: string,
    role: string
    created_at: Date,
    updated_at: Date,
    note?: string
}

@Table({tableName: "user_roles", timestamps: false})
export class UserRoleModel extends Model implements UserRoleModelAttributes {
    @PrimaryKey
    @AllowNull(false)
    @Column({type: DataType.STRING}) id!: string

    @AllowNull(false)
    @Column({type: DataType.STRING}) role!: ROLE

    @AllowNull(true)
    @Column({type: DataType.STRING}) note!: string
    
    @AllowNull(false)
    @Column({type: DataType.DATE}) created_at!: Date

    @AllowNull(false)
    @Column({type: DataType.DATE}) updated_at!: Date

}