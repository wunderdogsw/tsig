import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  ThemeProvider,
  createMuiTheme,
  CssBaseline,
  Paper
} from "@material-ui/core";
import { Note } from "./domain/Note";
import { AddNote } from "./components/AddNote";

function App() {
  const notes: Note[] = [{ id: 1, title: "Jotain", description: "Kuvaus" }];
  return (
    <div className="App">
      <ThemeProvider theme={createMuiTheme({ palette: { type: "dark" } })}>
        <CssBaseline />
        <AddNote />
        <Paper>
          <List>
            {notes.map(note => (
              <ListItem key={note.id}>
                <ListItemText
                  primary={note.title}
                  secondary={
                    <Typography variant="body2">{note.description}</Typography>
                  }
                ></ListItemText>
              </ListItem>
            ))}
          </List>
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default App;
