import {
  Get,
  JsonController,
  Post,
  Body
} from "routing-controllers";

import { NoteService } from "../services/NoteService";


export type UpsertNote = {
  title: string;
  description: string;
};

@JsonController("/note")
export default class NoteController {
  private service: NoteService;

  constructor() {
    this.service = new NoteService();
  }

  @Get("")
  public async fetchNotes() {
    const notes = await this.service.fetchNotes();
    return { notes };
  }

  @Post("")
  public async addNote(@Body() note: UpsertNote) {
    return await this.service.addNote(note);
  }
}
