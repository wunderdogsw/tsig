export enum AscentType {
  Onsight = "onsight",
  Flash = "flash",
  Redpoint = "redpoint",
  Repeat = "repeat"
}

export enum RouteType {
  Boulder = "boulder",
  Sport = "sport"
}

export const ascentTypesByRouteType = (routeType: RouteType) =>
  routeType === RouteType.Boulder
    ? Object.values(AscentType).filter(a => a !== AscentType.Onsight)
    : Object.values(AscentType);

export enum AscentStatus {
  PendingAdd,
  PendingEdit,
  PendingRemove
}

export type Ascent = {
  id: string;
  gradeValue: number;
  ascentType: AscentType;
  routeType: RouteType;
  date: Date;
  status?: AscentStatus;
};

export type AscentDto = {
  id: string;
  grade: number;
  ascentType: AscentType;
  routeType: RouteType;
  datetime: string;
};

// TODO: Sync with API type somehow? /ascents/shared? Only needed by TS
type UpsertAscentType = {
  id: string;
  grade: number;
  routeType: RouteType;
  ascentType: AscentType;
  datetime: string;
};

// Sorters

export const sortByDate = (a: Ascent, b: Ascent) =>
  b.date.getTime() - a.date.getTime();

// Filters

export const filterByRouteType = (routeType: RouteType) => (ascent: Ascent) =>
  ascent.routeType === routeType;

export const filterByStatus = (status?: AscentStatus) => (ascent: Ascent) =>
  ascent.status === status;

// Mappers

export const mapAscentDtoToAscent = (ascent: AscentDto): Ascent => ({
  ...ascent,
  gradeValue: ascent.grade,
  date: new Date(ascent.datetime)
});

export const mapAscentToUpsertAscent = (ascent: Ascent): UpsertAscentType => ({
  ...ascent,
  grade: ascent.gradeValue,
  datetime: ascent.date.toISOString()
});

export const clearStatus = (ascent: Ascent) => ({
  ...ascent,
  status: undefined
});

// List editors

export const addToAscents = (ascents: Ascent[], ascent: Ascent) => [
  ...ascents,
  ascent
];

export const addManyToAscents = (ascents: Ascent[], newAscents: Ascent[]) => [
  ...ascents,
  ...newAscents
];

export const editInAscents = (ascents: Ascent[], editedAscent: Ascent) =>
  addToAscents(removeFromAscents(ascents, editedAscent.id), editedAscent);

export const removeFromAscents = (ascents: Ascent[], ascentId: string) => [
  ...ascents.filter(a => a.id !== ascentId)
];
