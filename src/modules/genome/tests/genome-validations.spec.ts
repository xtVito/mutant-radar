import request from "supertest";
import httpStatus from "http-status";

import { API_PREFIX } from "../../../config/constants";
import App from "../../../app"

import GenomeService from '../genome.service';
import { generateGenomeCode } from './utils/genome.generate';

const app = App.app;
const apiURL = `${API_PREFIX}/genome`;

afterEach(() => {
  jest.resetAllMocks()
})

describe("dna validations", () => {
  test("respond with 400-bad-request if dna array isn't sent", async () => {
    await request(app)
      .post(`${apiURL}/mutant`)
      .send()
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.BAD_REQUEST)
  });

  test("respond with 400-bad-request if dna array is empty", async () => {
    const data = {
      dna: [],
    };

    await request(app)
      .post(`${apiURL}/mutant`)
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.BAD_REQUEST);
  });

  test("respond with 400-bad-request if dna array contains empty items", async () => {
    const data = {
      dna: ["ATGC", "CAGT", "", "AGAA"],
    };

    await request(app)
      .post(`${apiURL}/mutant`)
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.BAD_REQUEST);
  });

  test("respond with 400-bad-request if dna array lenght is less to 4", async () => {
    const data = {
      dna: ["ATG", "CAG", "TTA"],
    };

    await request(app)
      .post(`${apiURL}/mutant`)
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.BAD_REQUEST);
  });

  test("respond with 400-bad-request if dna array isn't NxN size (by item lenght)", async () => {
    const data = {
      dna: ["ATGC", "CAG", "TTAT", "AGAA"],
    };

    await request(app)
      .post(`${apiURL}/mutant`)
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.BAD_REQUEST);
  });

  test("respond with 400-bad-request if dna array isn't NxN size (by array lenght)", async () => {
    const data = {
      dna: ["ATGC", "CAGT", "TTAT", "AGAA", "CCCC"],
    };

    await request(app)
      .post(`${apiURL}/mutant`)
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.BAD_REQUEST);
  });

  test("respond with 400-bad-request if dna array item contains a diferent letter to A, C, G or T", async () => {
    const data = {
      dna: ["ATGC", "CAGT", "TTAF", "AGAT"],
    };

    await request(app)
      .post(`${apiURL}/mutant`)
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.BAD_REQUEST);
  });

  test("respond with 200-ok if dna array item contains lowercase letters", async () => {
    const data = {
      dna: ["atgc", "cagt", "ttat", "cccc"],
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
});