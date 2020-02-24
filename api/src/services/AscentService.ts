import { getRepository, Repository } from "typeorm";

import { Ascent } from "../entity/Ascent";
import { User } from "../entity/User";
import { AscentDto, UpsertAscentType } from "../dtos/AscentDto";

export class AscentService {
  private repository: Repository<Ascent>;

  constructor() {
    this.repository = getRepository(Ascent);
  }

  public async fetchAscents(user: User) {
    const ascents = await this.repository.find({
      where: { user: { id: user.id } }
    });
    return ascents.map(ascent => new AscentDto(ascent));
  }

  public async fetchAscent(ascentId: string) {
    const ascent = await this.repository.findOne(ascentId);
    return new AscentDto(ascent);
  }

  public async addAscent(ascentData: UpsertAscentType, user: User) {
    const ascent = this.createAscentFromData(ascentData, user);
    const insertResult = await this.repository.insert(ascent);

    const ascentId: string = insertResult.identifiers.find(() => true).id;
    return await this.fetchAscent(ascentId);
  }

  public async addAscents(ascentData: UpsertAscentType[], user: User) {
    const ascents = ascentData.map(ascent =>
      this.createAscentFromData(ascent, user)
    );
    await this.repository.insert(ascents);
  }

  public async editAscent(
    ascentId: string,
    ascentData: UpsertAscentType,
    user: User
  ) {
    if (ascentId !== ascentData.id) {
      throw new Error(
        `Mismatch between ascent id (${ascentId}) and ascent data (${ascentData.id})`
      );
    }
    const ascent = this.createAscentFromData(ascentData, user);
    await this.repository.update(ascentId, ascent);

    return await this.fetchAscent(ascentId);
  }

  public async removeAscent(ascentId: string) {
    await this.repository.delete(ascentId);
  }

  createAscentFromData(ascentData: UpsertAscentType, user: User) {
    const ascent = new Ascent();
    ascent.user = user;
    ascent.id = ascentData.id;
    ascent.grade = ascentData.grade;
    ascent.ascentType = ascentData.ascentType;
    ascent.routeType = ascentData.routeType;
    ascent.datetime = ascentData.datetime;
    return ascent;
  }
}
