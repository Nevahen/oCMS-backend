import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  ForeignKey,
  PrimaryKey,
  BelongsTo
} from "sequelize-typescript";
import User from "./user";

@Table({
  tableName: "ocms_pages"
})
export default class Page extends Model<Page> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  page_id: number;
  @Column(DataType.STRING) title: string;
  @Column(DataType.TEXT) content: string;

  @BelongsTo(() => User)
  author: User;

  @ForeignKey(() => User)
  @Column
  author_id: number;

  @Column(DataType.INTEGER) status: number;
  @Column(DataType.STRING) permalink: string;
}
