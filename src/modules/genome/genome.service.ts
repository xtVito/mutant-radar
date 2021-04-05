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

    if (result.get("TYPE") === GenomeType.MUTANT) {
      response = { status: httpStatus.OK, body: "MUTANT" };
    } else {
      response = { status: httpStatus.FORBIDDEN, body: "HUMAN" };
    }

    await this.createGenome(result.get("DNA"), result.get("TYPE"));

    return response;
  }

  async getGenomeStats(): Promise<DataResponse> {
    let response: DataResponse;
    const [muts, hums] = await Promise.all([
      getRepository(Genome).count({ where: { type: GenomeType.MUTANT } }),
      getRepository(Genome).count({ where: { type: GenomeType.HUMAN } })
    ])

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
    let dnaMatrix: any[][] = dna.map((v: any) => [...v]);
    let dnaConcat: string = dna.join(',');
    let diag: string[] = ["", ""];
    let size: number = dna.length;

    for (var i = 0; i < size; i++) {
      dnaConcat += ',';
      diag[0] += dnaMatrix[i][i];
      diag[1] += dnaMatrix[i][size - i - 1];
      for (var j = 0; j < size; j++) {
        dnaConcat += dnaMatrix[j][i];
      }
    }

    dnaConcat += `,${diag.join(",")}`;

    for (let dna of DNA_ACCEPTED) {
      if (dnaConcat.toUpperCase().includes(dna.repeat(MIN_DNA_ITEMS))) {
        result.set("TYPE", GenomeType.MUTANT);
        break;
      } else {
        result.set("TYPE", GenomeType.HUMAN);
      }
    }

    /* if (/(A|a){4}|(C|c){4}|(G|g){4}|(T|t){4}/g.test(dnaConcat)) {
      result.set("TYPE", GenomeType.MUTANT);
    } else {
      result.set("TYPE", GenomeType.HUMAN);
    } */

    result.set("DNA", dnaConcat);
    return result;
  }
}

export default new GenomeService();