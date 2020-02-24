import {
  Get,
  JsonController,
  Param,
  Post,
  Put,
  Body,
  Delete,
  CurrentUser
} from "routing-controllers";

import { AscentAuthorizer } from "../authorizers/AscentAuthorizer";
import { AscentService } from "../services/AscentService";
import { UpsertAscentType } from "../dtos/AscentDto";
import { User } from "../entity/User";

@JsonController("/ascents")
export default class AscentController {
  private authorizer: AscentAuthorizer;
  private service: AscentService;

  constructor() {
    this.authorizer = new AscentAuthorizer();
    this.service = new AscentService();
  }

  @Get("")
  public async fetchAscents(@CurrentUser({ required: true }) user: User) {
    const ascents = await this.service.fetchAscents(user);
    return { ascents: ascents };
  }

  @Get("/:id")
  public async fetchAscent(
    @CurrentUser({ required: true }) user: User,
    @Param("id") ascentId: string
  ) {
    await this.authorizer.authorizeByAscentId(user, ascentId);
    return await this.service.fetchAscent(ascentId);
  }

  @Post("")
  public async addAscent(
    @CurrentUser({ required: true }) user: User,
    @Body() ascent: UpsertAscentType
  ) {
    return await this.service.addAscent(ascent, user);
  }

  @Post("/bulk")
  public async addAscents(
    @CurrentUser({ required: true }) user: User,
    @Body() ascents: UpsertAscentType[]
  ) {
    await this.service.addAscents(ascents, user);
    return "ok";
  }

  @Put("/:id")
  public async editAscent(
    @CurrentUser({ required: true }) user: User,
    @Param("id") ascentId: string,
    @Body() ascent: UpsertAscentType
  ) {
    await this.authorizer.authorizeByAscentId(user, ascentId);
    return await this.service.editAscent(ascentId, ascent, user);
  }

  @Delete("/:id")
  public async deleteAscent(
    @CurrentUser({ required: true }) user: User,
    @Param("id") ascentId: string
  ) {
    await this.authorizer.authorizeByAscentId(user, ascentId);
    await this.service.removeAscent(ascentId);
    return "ok";
  }
}
