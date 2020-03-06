import React, { FC, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { AddNoteRequest } from "../domain/Note";

export const AddNote: FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addNote = () => {
    const request: AddNoteRequest = {
      title,
      description
    };

    console.log("ADD NOTE", request);
  };

  return (
    <form>
      <TextField
        id="title"
        label="Title"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
      />
      <TextField
        id="description"
        label="Description"
        value={description}
        onChange={ev => setDescription(ev.target.value)}
      />
      <Button variant="contained" onClick={addNote}>
        +
      </Button>
    </form>
  );
};
