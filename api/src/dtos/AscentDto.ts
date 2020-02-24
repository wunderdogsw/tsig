import { Ascent } from "../entity/Ascent";

export type AscentType = "onsight" | "flash" | "redpoint" | "repeat";
export type RouteType = "boulder" | "sport";

export class AscentDto {
  public id: string;
  public grade: number;
  public routeType: RouteType;
  public ascentType: AscentType;
  public datetime: string;

  constructor(ascent: Ascent) {
    this.id = ascent.id;
    this.grade = ascent.grade;
    this.routeType = ascent.routeType as RouteType;
    this.ascentType = ascent.ascentType as AscentType;
    this.datetime = ascent.datetime;
  }
}

export type UpsertAscentType = {
  id: string;
  grade: number;
  routeType: RouteType;
  ascentType: AscentType;
  datetime?: string;
};
