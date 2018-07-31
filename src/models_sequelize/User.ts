import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  DefaultScope
} from "sequelize-typescript";
import Page from "./page";

@DefaultScope({
  attributes: ["userid", "username", "email", "firstname", "lastname"]
})
@Table({
  tableName: "ocms_users"
})
export default class User extends Model<User> {
  @Column({ primaryKey: true, type: DataType.INTEGER })
  userid: number;

  @Column(DataType.STRING) username: string;
  @Column(DataType.STRING) email: string;
  @Column(DataType.STRING) firstname: string;
  @Column(DataType.STRING) lastname: string;
  @Column(DataType.STRING) password: string;
  @Column(DataType.BOOLEAN) activated: boolean;
  @Column(DataType.BOOLEAN) password_reset_pending: boolean;
  @Column(DataType.BOOLEAN) password_reset_secret: boolean;
  @HasMany(() => Page)
  pages: Page[];
}
