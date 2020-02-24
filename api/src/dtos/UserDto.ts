import { User } from "../entity/User";

export class UserDto {
  public username: string;

  constructor(user: User) {
    this.username = user.name;
  }
}

export type UpsertUserType = {
  username: string;
};
