import DuckFactory from "./DuckFactory";

export type UserState = {
  username?: string;
};
const initialState: UserState = {
  username: undefined
};

const prefix = "ascents/user";
const factory = new DuckFactory<UserState>();

export const login = factory.createAction(
  `${prefix}/LOGIN`,
  (username: string) => () => ({
    username
  })
);
export const logout = factory.createAction(`${prefix}/LOGOUT`, () => () =>
  initialState
);

export default factory.createReducer(initialState);
