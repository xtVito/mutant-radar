import { API_PREFIX } from "./config/constants";
import * as genome from './modules/genome/genome.swagger';

export const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    version: '1.0.0',
    title: "MutantRadar - v1",
    description: 'Analyze some DNA and recruit your new mutants.'
  },
  servers: [
    {
      url: API_PREFIX,
    },
  ],
  consumes: [
    "application/json"
  ],
  produces: [
    "application/json"
  ],
  tags: [
    genome.tag
  ],
  paths: genome.paths,
  components: genome.components
}

export const swaggerOptions = {
  swaggerOptions: {
    displayRequestDuration: true
  }
}