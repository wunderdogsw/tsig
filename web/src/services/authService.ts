import { Dispatch } from "redux";

import { post } from "../clients/apiClient";
import {
  clear,
  setLocalUser,
  setAuthToken,
  getAuthToken
} from "../clients/storageClient";
import { clear as clearAction } from "../ducks/ascent";
import { login as loginAction, logout as logoutAction } from "../ducks/user";

const AUTH_API_PATH = "auth";
type AuthResponse = {
  token: string;
};

export const login = async (
  username: string,
  idToken: string,
  dispatch: Dispatch
) => {
  const user = { username, idToken };
  const json = await post<AuthResponse>(`${AUTH_API_PATH}/login`, user);
  await setLocalUser(user);
  await setAuthToken(json.token);
  dispatch(loginAction(username));
};

export const refreshLogin = async (username: string, idToken: string) => {
  const user = { username, idToken };
  const json = await post<AuthResponse>(`${AUTH_API_PATH}/refresh`, user);
  await setAuthToken(json.token);
};

export const getAuthHeader = async () => ({
  Authorization: `Bearer ${await getAuthToken()}`
});

export const logout = async (dispatch: Dispatch) => {
  await clear();
  dispatch(logoutAction());
  dispatch(clearAction());
};
