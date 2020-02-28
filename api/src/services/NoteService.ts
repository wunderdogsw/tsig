import { getRepository, Repository } from "typeorm";

import { Note } from "../entity/Note";
import { UpsertNote } from "../controllers/NoteController";

export class NoteService {
  private repository: Repository<Note>;

  constructor() {
    this.repository = getRepository(Note);
  }

  public async fetchNotes() {
    return await this.repository.find();
  }

  public async addNote(data: UpsertNote) {
    const note = new Note();
    note.title = data.title;
    note.description = data.description;
    const insertResult = await this.repository.insert(note);

    const noteId: string = insertResult.identifiers.find(() => true).id;
    return await this.repository.findOne(noteId);
  }
}
