import {
  AscentDto,
  AscentType,
  mapAscentDtoToAscent,
  RouteType
} from "./ascent";
import uuid from "uuid";

type AccountAscent = Pick<
  AscentDto,
  "grade" | "ascentType" | "routeType" | "datetime"
>;

export type AscentImport = {
  ascents: AccountAscent[];
};

type TwentySevenAscent = {
  ascent_type: AscentType | string;
  grade_opinion: string;
  date: string;
};
type ValidTwentySevenAscent = TwentySevenAscent & {
  ascent_type: AscentType;
};

export type TwentySevenImport = {
  climber: { ascents: TwentySevenAscent[] };
};

export type AscentExport = { username: string } & AscentImport;

export type JsonImport = AscentImport | TwentySevenImport;

function isValidAscent(
  ascent: TwentySevenAscent
): ascent is ValidTwentySevenAscent {
  return Object.values(AscentType).some(
    ascentType => ascentType === ascent.ascent_type
  );
}

export function isRegularImport(json: JsonImport): json is AscentImport {
  return (json as AscentImport).ascents !== undefined;
}

export function mapImportToAscents(json: JsonImport) {
  if (isRegularImport(json)) {
    return json.ascents
      .map(ascent => ({ id: uuid(), ...ascent }))
      .map(mapAscentDtoToAscent);
  }
  return json.climber.ascents
    .filter(isValidAscent)
    .filter(ascent => opinionToGrade(ascent.grade_opinion) !== null)
    .map(
      (ascent): AscentDto => ({
        id: uuid(),
        grade: opinionToGrade(ascent.grade_opinion) as number,
        ascentType: ascent.ascent_type,
        routeType: RouteType.Boulder,
        datetime: ascent.date
      })
    )
    .map(mapAscentDtoToAscent);
}
const opinionToGrade = (opinion: string) => {
  switch (opinion) {
    case "6a":
      return 400;
    case "6a+":
      return 450;
    case "6b":
      return 500;
    case "6b+":
      return 550;
    case "6c":
      return 600;
    case "6c+":
      return 650;
    case "7a":
      return 700;
    case "7a+":
      return 750;
    case "7b":
      return 800;
    case "7b+":
      return 850;
    case "7c":
      return 900;
    case "7c+":
      return 950;
    case "8a":
      return 1000;
    default:
      return null;
  }
};
