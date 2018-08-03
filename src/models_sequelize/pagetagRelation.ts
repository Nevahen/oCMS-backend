import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  ForeignKey
} from "sequelize-typescript";
import PageTag from "./pagetag";
import Page from "./page";

@Table({ tableName: "ocms_page_tags" })
export default class PageTagRelation extends Model<PageTagRelation> {
  @ForeignKey(() => PageTag)
  @Column(DataType.INTEGER)
  tag_id: number;

  @ForeignKey(() => Page)
  @Column(DataType.INTEGER)
  page_id: number;
}
