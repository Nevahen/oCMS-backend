import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  BelongsToMany,
  DefaultScope
} from "sequelize-typescript";
import Page from "./page";
import PageTagRelation from "./pagetagRelation";

@DefaultScope({ attributes: ["tag_id", "tag_name"] })
@Table({ tableName: "ocms_tags" })
export default class PageTag extends Model<PageTag> {
  @Column({ primaryKey: true, type: DataType.INTEGER })
  tag_id: number;
  @Column(DataType.STRING) tag_name: string;

  @BelongsToMany(() => Page, () => PageTagRelation)
  pages: Page[];
}
