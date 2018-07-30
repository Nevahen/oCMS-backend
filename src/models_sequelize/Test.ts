import { Table, Column, Model, HasMany, DataType } from "sequelize-typescript";

@Table({
  tableName: "ocms_test"
})
export default class Test extends Model<Test> {
  @Column({ primaryKey: true, type: DataType.INTEGER })
  userid: number;

  @Column(DataType.STRING) username: string;
  @Column(DataType.STRING) test: string;
}
