import express, { json } from "express";
import swaggerUI from "swagger-ui-express";
import morgan from "morgan";
import cors from "cors";
import { createConnection } from "typeorm";

import { swaggerConfig, swaggerOptions } from './app.swagger';

import { API_PREFIX } from "./config/constants";
import AppRoutes from "./modules/index.routes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    createConnection();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(morgan('dev'));
  }

  routes() {
    this.app.use(API_PREFIX, AppRoutes.router);
    this.app.use(`${API_PREFIX}/api-docs`, swaggerUI.serve, swaggerUI.setup(swaggerConfig, swaggerOptions));
  }
}

export default new App();