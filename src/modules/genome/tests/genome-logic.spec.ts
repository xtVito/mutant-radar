import request from "supertest";
import httpStatus from "http-status";

import { API_PREFIX } from "../../../config/constants";
import App from "../../../app"

import GenomeService from '../genome.service';
import { generateGenomeCode } from './utils/genome.generate';

const app = App.app;
const apiURL = `${API_PREFIX}/genome`;

describe("mutant radar logic", () => {
  test("respond with 200-ok if detects a mutant (horizontal)", async () => {
    const data = {
      dna: ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCCCCG"],
    };

    const spy = jest.spyOn(GenomeService, 'createGenome');
    spy.mockImplementationOnce(() => generateGenomeCode());

    await request(app)
      .post(`${apiURL}/mutant`)
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK);
  });

  test("respond with 200-ok if detects a mutant (vertical)", async () => {
    const data = {
      dna: ["ATGCGA", "CAGTGC", "TTATTT", "AGATGG", "GCGTCA", "TCACTG"],
    };

    const spy = jest.spyOn(GenomeService, 'createGenome');
    spy.mockImplementationOnce(() => generateGenomeCode());

    await request(app)
      .post(`${apiURL}/mutant`)
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK);
  });

  test("respond with 200-ok if detects a mutant (diagonal right to left)", async () => {
    const data = {
      dna: ["ATGCGA", "CAGTGC", "TTGTTT", "AGAGGG", "GCGTGA", "TCACTG"],
    };

    const spy = jest.spyOn(GenomeService, 'createGenome');
    spy.mockImplementationOnce(() => generateGenomeCode());

    await request(app)
      .post(`${apiURL}/mutant`)
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK);
  });

  test("respond with 200-ok if detects a mutant (diagonal left to right)", async () => {
    const data = {
      dna: ["ATGCGA", "CAGTAC", "TTAATT", "AGACGG", "GCGTCA", "TCACTG"],
    };

    const spy = jest.spyOn(GenomeService, 'createGenome');
    spy.mockImplementationOnce(() => generateGenomeCode());

    await request(app)
      .post(`${apiURL}/mutant`)
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK);
  });

  test("respond with 200-ok if detects a mutant (all directions)", async () => {
    const data = {
      dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
    };

    const spy = jest.spyOn(GenomeService, 'createGenome');
    spy.mockImplementationOnce(() => generateGenomeCode());

    await request(app)
      .post(`${apiURL}/mutant`)
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK);
  });

  test("respond with 403-forbidden if detects a human", async () => {
    const data = {
      dna: ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"],
    };

    const spy = jest.spyOn(GenomeService, 'createGenome');
    spy.mockImplementationOnce(() => generateGenomeCode());

    await request(app)
      .post(`${apiURL}/mutant`)
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.FORBIDDEN);
  });
});