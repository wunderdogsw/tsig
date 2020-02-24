import DuckFactory from "./DuckFactory";
import {
  Ascent,
  sortByDate,
  addToAscents,
  addManyToAscents,
  editInAscents,
  removeFromAscents
} from "../types/ascent";

export type AscentState = {
  ascents: Ascent[];
};
const initialState: AscentState = {
  ascents: []
};

const prefix = "ascents/ascent";
const factory = new DuckFactory<AscentState>();

export const set = factory.createAction(
  `${prefix}/SET`,
  (ascents: Ascent[]) => () => ({
    ascents: ascents.sort(sortByDate)
  })
);
export const add = factory.createAction(
  `${prefix}/ADD`,
  (ascent: Ascent) => (state: AscentState) => ({
    ascents: addToAscents(state.ascents, ascent).sort(sortByDate)
  })
);
export const addMany = factory.createAction(
  `${prefix}/ADD_MANY`,
  (ascents: Ascent[]) => (state: AscentState) => ({
    ascents: addManyToAscents(state.ascents, ascents).sort(sortByDate)
  })
);
export const edit = factory.createAction(
  `${prefix}/EDIT`,
  (ascent: Ascent) => (state: AscentState) => ({
    ascents: editInAscents(state.ascents, ascent).sort(sortByDate)
  })
);
export const remove = factory.createAction(
  `${prefix}/REMOVE`,
  (ascentId: string) => (state: AscentState) => ({
    ascents: removeFromAscents(state.ascents, ascentId).sort(sortByDate)
  })
);
export const clear = factory.createAction(`${prefix}/CLEAR`, () => () =>
  initialState
);

export default factory.createReducer(initialState);
