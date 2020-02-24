import { createInstance } from "localforage";

import { UserState } from "../ducks/user";
import { AscentState } from "../ducks/ascent";

const DB_NAME = "ascents";
const AUTH_TOKEN_KEY = "authToken";
const USER_KEY = "user";
const ASCENTS_KEY = "ascents";

const localStore = createInstance({ name: DB_NAME });

export const clear = () => localStore.clear();

export const getAuthToken = async () => {
  return await localStore.getItem<string>(AUTH_TOKEN_KEY);
};

export const setAuthToken = async (token: string) => {
  await localStore.setItem<string>(AUTH_TOKEN_KEY, token);
};

export const getLocalUser = async () => {
  return await localStore.getItem<UserState>(USER_KEY);
};

export const setLocalUser = async (user: UserState) => {
  await localStore.setItem<UserState>(USER_KEY, user);
};

export const getLocalAscents = async () => {
  return await localStore.getItem<AscentState>(ASCENTS_KEY);
};

export const setLocalAscents = async (ascents: AscentState) => {
  await localStore.setItem<AscentState>(ASCENTS_KEY, ascents);
};
