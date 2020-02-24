import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Ascent {
  @PrimaryColumn("uuid")
  public id: string;

  @Column("int")
  public grade: number;

  @Column()
  public ascentType: string;

  @Column()
  public routeType: string;

  @Column("timestamp")
  public datetime: string;

  @ManyToOne(
    type => User,
    user => user.ascents
  )
  public user: User;
}
