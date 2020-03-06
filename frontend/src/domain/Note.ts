export type Note = {
  id: number;
  title: string;
  description: string;
};

export type AddNoteRequest = Omit<Note, "id">;
