import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { useExpressServer } from "routing-controllers";
import express from "express";
import http from "http";

import ormconfig from "../ormconfig";
import AscentController from "./controllers/AscentController";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";
import {
  authorizationChecker,
  currentUserChecker
} from "./controllers/actionHandlers";
import { Note } from "./entity/Note";

const port: number = 8080;

const startServer = async () => {
  await createConnection(ormconfig);

  const server = express();
  const app = useExpressServer(server, {
    controllers: [AuthController, UserController, AscentController],
    cors: true,
    authorizationChecker,
    currentUserChecker
  });

  app.use(express.json());

  app.get("/notes", async (req, res) => {
    const noteRepository = getRepository(Note);
    const notes = await noteRepository.find();

    res.status(200).json(notes);
  });

  app.post("/notes", async (req, res) => {
    const note = req.body;
    const noteRepository = getRepository(Note);

    const savedNote = await noteRepository.save(note);

    res.status(201).json(savedNote);
  });

  app.delete("/notes/:id", async (req, res) => {
    const noteRepository = getRepository(Note);

    try {
      const note = await noteRepository.findOne(req.params.id);
      if (!note) {
        res.status(404).json({ message: "not found" });
      }
      await noteRepository.delete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  http.createServer(app).listen(port);
};

startServer();
