import { getRepository, Repository } from "typeorm";

import { User } from "../entity/User";
import { UpsertUserType, UserDto } from "../dtos/UserDto";

export class UserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async fetchUsers() {
    const users = await this.repository.find();
    return users.map(user => new UserDto(user));
  }

  public async fetchUser(name: string) {
    return await this.repository.findOne({ where: { name: name } });
  }

  public async fetchUserWithAscents(name: string) {
    return await this.repository.findOne({
      where: { name: name },
      relations: ["ascents"]
    });
  }

  public async addUser(data: UpsertUserType) {
    const user = creatUserFromData(data);
    await this.repository.insert(user);
    return await this.fetchUser(data.username);
  }

  public async editUser(username: string, data: UpsertUserType) {
    const user = creatUserFromData(data);
    const userId = (await this.fetchUser(username)).id;
    await this.repository.update(userId, user);
    return await this.fetchUser(data.username);
  }

  public async removeUser(username: string) {
    const user = await this.fetchUser(username);
    await this.repository.delete(user.id);
  }
}

const creatUserFromData = (data: UpsertUserType) => {
  const user = new User();
  user.name = data.username;
  return user;
};
