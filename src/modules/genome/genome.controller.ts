import { Request, Response } from "express";

import { GenomeNewDTO } from "./dtos";
import GenomeService from "./genome.service";

class GenomeController {
  async detectMutant(req: Request, res: Response) {
    let dto: GenomeNewDTO = req.body;

    await GenomeService
      .detectMutant(dto)
      .then(result => res.status(result.status).json(result))
      .catch(err => {
        console.log('Error');
      });
  }

  async getGenomeStats(req: Request, res: Response) {
    await GenomeService
      .getGenomeStats()
      .then(result => res.status(result.status).json(result))
      .catch(err => {
        console.log('Error');
      });
  }
}

export default new GenomeController();