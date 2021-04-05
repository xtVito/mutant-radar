import express, { Router } from "express";

import GenomeRoutes from "./genome/genome.routes";

class AppRoutes {
  public router: express.Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.use("/genome", GenomeRoutes.router);
  }
}

export default new AppRoutes();