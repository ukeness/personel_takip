import { table } from "console";
import { DataType, Table, Model, PrimaryKey, AllowNull, Column} from "sequelize-typescript";

interface UserRoleModelAttributes {
    id: string,
    role: string
    note: string
}

@Table({tableName: "user_roles", timestamps: false})
export class UserRoleModel extends Model implements UserRoleModelAttributes {
    @PrimaryKey
    @AllowNull(false)
    @Column({type: DataType.STRING}) id!: string

    @AllowNull(false)
    @Column({type: DataType.STRING}) role!: string

    @AllowNull(true)
    @Column({type: DataType.STRING}) note!: string

}