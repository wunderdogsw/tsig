import {
  Get,
  JsonController,
  Param,
  Post,
  Put,
  Body,
  Delete,
  BadRequestError,
  ForbiddenError,
  Authorized
} from "routing-controllers";
import { UserService } from "../services/UserService";
import { UpsertUserType } from "../dtos/UserDto";

@Authorized()
@JsonController("/users")
export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  private async validateUser(user: UpsertUserType, username?: string) {
    if (!user.username || user.username.length < 3) {
      throw new BadRequestError("Invalid username");
    }
    if (username && username !== user.username) {
      throw new BadRequestError("Invalid username");
    }
    const existingUser = await this.service.fetchUser(user.username);
    if (existingUser) {
      throw new ForbiddenError("Username in use");
    }
  }

  @Get("")
  public async fetchUsers() {
    const users = await this.service.fetchUsers();
    return { users: users };
  }

  @Get("/:name")
  public async fetchUser(@Param("name") username: string) {
    return await this.service.fetchUserWithAscents(username);
  }

  @Post("")
  public async addUser(@Body() user: UpsertUserType) {
    await this.validateUser(user);
    return await this.service.addUser(user);
  }

  @Put("/:name")
  public async editUser(
    @Param("name") username: string,
    @Body() user: UpsertUserType
  ) {
    await this.validateUser(user, username);
    return await this.service.editUser(username, user);
  }

  @Delete("/:name")
  public async deleteUser(@Param("name") username: string) {
    return await this.service.removeUser(username);
  }
}
