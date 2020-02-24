import "reflect-metadata";
import { Action } from "routing-controllers";
import { Response } from "express";
import jwt from "jsonwebtoken";

import { UserService } from "../services/UserService";
import { User } from "../entity/User";

const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const EXPIRES_IN = "12h";

type Headers = {
  host: string;
  "user-agent": string;
  cookie: string;
  accept: string;
  authorization?: string;
};

type TokenPayload = { username: string };

type Request = {
  headers: Headers;
  session: { user?: User };
};

const getTokenPayload = (action: Action) => {
  const request: Request = action.request;
  const bearerToken = request.headers.authorization;
  const token = bearerToken.slice(7, bearerToken.length);
  return jwt.verify(token, TOKEN_SECRET) as TokenPayload;
};

export const createSignedToken = (username: string) =>
  jwt.sign({ username }, TOKEN_SECRET, { expiresIn: EXPIRES_IN });

export const authorizationChecker = async (action: Action) => {
  if (process.env.LOCAL === "local") {
    return true;
  }
  const payload = getTokenPayload(action);
  const userService = new UserService();
  const user = await userService.fetchUser(payload.username);
  console.log(user); // TODO
  return true; // TODO
};

export const currentUserChecker = async (action: Action) => {
  const response: Response = action.response;

  const payload = getTokenPayload(action);
  const newToken = createSignedToken(payload.username);
  response.setHeader("token", newToken);

  const userService = new UserService();
  return await userService.fetchUser(payload.username);
};
