import "reflect-metadata";
import { createConnection } from "typeorm";
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

  http.createServer(app).listen(port);
};

startServer();
