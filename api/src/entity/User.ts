import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ascent } from "./Ascent";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(
    type => Ascent,
    ascent => ascent.user
  )
  public ascents: Ascent[];
}
