import React from "react";
import {NotesRepository} from "./NotesRepository";

type NotesProps = {
  notesRepository: NotesRepository
}

export function Notes(props: NotesProps) {
  const {notesRepository} = props

  const items = notesRepository
    .getNotes()
    .map((note, index) => <li key={index}> {note} </li>);

  return <ul> {items} </ul>
}

