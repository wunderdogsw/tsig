import { User } from "../entity/User";
import { UserService } from "../services/UserService";
import { UnauthorizedError } from "routing-controllers";

export class AscentAuthorizer {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async authorizeByAscentId(user: User, ascentId: string) {
    const userWithAscents = await this.userService.fetchUserWithAscents(
      user.name
    );
    const match = userWithAscents.ascents.find(ascent => ascent.id === ascentId);
    if (match === undefined) {
      throw new UnauthorizedError();
    }
  }
}
