export type Note = string

export interface NotesRepository {
  getNotes: () => Note[]
}

export class NotesRepositoryStub implements NotesRepository {
  getNotes(): Note[] {
    return ['Foo', 'Bar']
  }
}