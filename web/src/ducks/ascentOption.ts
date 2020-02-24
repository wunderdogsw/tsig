import DuckFactory from "./DuckFactory";
import { RouteType } from "../types/ascent";

export enum DateGroupType {
  Week = "week",
  Month = "month",
  Quarter = "quarter",
  Year = "year"
}

export enum GroupSizeType {
  Best = "best",
  TopTen = "top 10",
  All = "all"
}

export type AscentOptionState = {
  routeType: RouteType;
  dateGroup: DateGroupType;
  groupSize: GroupSizeType;
  combineRedpoint: boolean;
  combineFlash: boolean;
};
const initialState: AscentOptionState = {
  routeType: RouteType.Boulder,
  dateGroup: DateGroupType.Month,
  groupSize: GroupSizeType.TopTen,
  combineRedpoint: true,
  combineFlash: false
};

const prefix = "ascents/ascentOption";
const factory = new DuckFactory<AscentOptionState>();

export const setRouteType = factory.createAction(
  `${prefix}/ROUTE_TYPE`,
  (routeType: RouteType) => (state: AscentOptionState) => ({
    ...state,
    routeType
  })
);
export const setDateGroup = factory.createAction(
  `${prefix}/DATE_GROUP`,
  (dateGroup: DateGroupType) => (state: AscentOptionState) => ({
    ...state,
    dateGroup
  })
);
export const setGroupSize = factory.createAction(
  `${prefix}/GROUP_SIZE`,
  (groupSize: GroupSizeType) => (state: AscentOptionState) => ({
    ...state,
    groupSize
  })
);
export const setCombineRedpoint = factory.createAction(
  `${prefix}/COMBINE_REDPOINT`,
  (combineRedpoint: boolean) => (state: AscentOptionState) => ({
    ...state,
    combineRedpoint
  })
);
export const setCombineFlash = factory.createAction(
  `${prefix}/COMBINE_FLASH`,
  (combineFlash: boolean) => (state: AscentOptionState) => ({
    ...state,
    combineFlash
  })
);

export default factory.createReducer(initialState);
