import httpStatus from "http-status";
import { getRepository } from "typeorm";

import { DNA_ACCEPTED, MIN_DNA_ITEMS } from '../../config/constants';
import { DataResponse } from '../../utils';
import { GenomeNewDTO } from "./dtos";
import { GenomeType } from './enums';
import { Genome } from './entities/genome.entity';

class GenomeService {
  async detectMutant(dto: GenomeNewDTO): Promise<DataResponse> {
    let result: Map<string, any>;
    let response: DataResponse;

    result = await this.isMutant(dto.dna);

    // fill response object
    if (result.get("TYPE") === GenomeType.MUTANT) {
      response = { status: httpStatus.OK, body: "MUTANT" };
    } else {
      response = { status: httpStatus.FORBIDDEN, body: "HUMAN" };
    }

    // Insert data dna into DB
    await this.createGenome(result.get("DNA"), result.get("TYPE"));

    return response;
  }

  async getGenomeStats(): Promise<DataResponse> {
    let response: DataResponse;
    const [muts, hums] = await Promise.all([
      getRepository(Genome).count({ where: { type: GenomeType.MUTANT } }),  // Count all Mutants into DB
      getRepository(Genome).count({ where: { type: GenomeType.HUMAN } })  // Count all Humans into DB
    ])

    // fill response object
    response = { status: httpStatus.OK, body: { count_mutant_dna: muts, count_human_dna: hums, ratio: hums > 0 ? muts / hums : 1 } };

    return response;
  }

  async createGenome(dna: string, type: GenomeType): Promise<string> {
    const genome: Genome = new Genome();
    genome.dna = dna;
    genome.type = type;

    const saved: Genome = await getRepository(Genome).save(genome);
    return saved.id;
  }

  private async isMutant(dna: any[]): Promise<Map<string, any>> {
    let result: Map<string, any> = new Map();
    let dnaMatrix: any[][] = dna.map((v: any) => [...v]); // Transform dna array to matrix NxN
    let dnaConcat: string = dna.join(',');  // Concat original dna array to evaluate horizontal matches
    let diag: string[] = ["", ""];
    let size: number = dna.length;

    for (var i = 0; i < size; i++) {
      dnaConcat += ',';
      diag[0] += dnaMatrix[i][i]; // Group letter to evaluate diagonal (left to right) matches
      diag[1] += dnaMatrix[i][size - i - 1];  // Group letter to evaluate diagonal (right to left) matches
      for (var j = 0; j < size; j++) {
        dnaConcat += dnaMatrix[j][i]; // Group letter to evaluate vertical matches
      }
    }

    dnaConcat += `,${diag.join(",")}`;  // Concat diagonal letter groups

    // evaluate all letter accepted
    for (let dna of DNA_ACCEPTED) {
      if (dnaConcat.toUpperCase().includes(dna.repeat(MIN_DNA_ITEMS))) {  // Evaluate each letter (reapeat 4 times in this case) with all groups concated
        result.set("TYPE", GenomeType.MUTANT);  // Set Mutant into result object
        break;
      } else {
        result.set("TYPE", GenomeType.HUMAN);  // Set Human into result object
      }
    }

    result.set("DNA", dnaConcat); // Set DNA into result object
    return result;
  }
}

export default new GenomeService();