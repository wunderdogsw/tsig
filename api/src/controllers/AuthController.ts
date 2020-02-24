import {
  JsonController,
  Post,
  Body,
  UnauthorizedError
} from "routing-controllers";
import { OAuth2Client } from "google-auth-library";

import { UserService } from "../services/UserService";
import { createSignedToken } from "./actionHandlers";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

type Credentials = {
  username: string;
  idToken: string;
};

@JsonController("/auth")
export default class AuthController {
  userService: UserService;
  authClient: OAuth2Client;

  constructor() {
    this.userService = new UserService();
    this.authClient = new OAuth2Client(GOOGLE_CLIENT_ID);
  }

  private async verifyIdToken(credentials: Credentials) {
    if (process.env.LOCAL === "local") {
      return;
    } else if (GOOGLE_CLIENT_ID === undefined) {
      throw new Error("Google client id missing from server configuration");
    }
    const loginTicket = await this.authClient.verifyIdToken({
      idToken: credentials.idToken,
      audience: GOOGLE_CLIENT_ID
    });
    const tokenPayload = loginTicket.getPayload();
    if (
      tokenPayload.email_verified &&
      tokenPayload.email !== credentials.username
    ) {
      throw new UnauthorizedError();
    }
  }

  @Post("/login")
  public async login(@Body() credentials: Credentials) {
    await this.verifyIdToken(credentials);
    const user =
      (await this.userService.fetchUser(credentials.username)) ??
      (await this.userService.addUser({ username: credentials.username }));
    return { token: createSignedToken(user.name) };
  }

  @Post("/refresh")
  public async refresh(@Body() credentials: Credentials) {
    await this.verifyIdToken(credentials);
    const user = await this.userService.fetchUser(credentials.username);
    return { token: createSignedToken(user.name) };
  }
}
