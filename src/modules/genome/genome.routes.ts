import express, { Router } from "express";

import { DTOValidator } from '../../utils';
import { GenomeSchema } from "./schemas";
import GenomeController from "./genome.controller";

class GenomeRoutes {
  public router: express.Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post("/mutant", DTOValidator(GenomeSchema), GenomeController.detectMutant);

    this.router.get("/stats", GenomeController.getGenomeStats);
  }
}

export default new GenomeRoutes();