import { Table, Column, Model, DataType, AllowNull, AutoIncrement, PrimaryKey } from 'sequelize-typescript';

@Table({tableName: "Users"})
export class User extends Model<User>{
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  }) id!: number;
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  }) username!: string;
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  }) password!: string;
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  }) role!: string;

}