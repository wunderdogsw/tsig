import React from 'react';
import {render, RenderResult} from '@testing-library/react';
import {Notes} from "./Notes";
import {Note, NotesRepository} from "./NotesRepository";

describe('Notes component', () => {
  it('should list notes from repo', () => {
    const notes: Note[] = ['foo', 'bar']

    const notesRepoStub: NotesRepository = {
      getNotes: () => notes
    }

    const html: RenderResult = render(<Notes notesRepository={notesRepoStub}/>)

    expect(html.getByText(/foo/i)).toBeInTheDocument()
    expect(html.getByText(/bar/i)).toBeInTheDocument()
  })
})