import { DNA_ACCEPTED, MIN_DNA_ITEMS } from '../../config/constants';

const TAG_NAME = 'Genome';

export const tag = {
  name: TAG_NAME,
  description: ''
}

export const paths = {
  '/genome/mutant': {
    post: {
      tags: [TAG_NAME],
      summary: "Evaluate a dna to detects a mutant",
      requestBody: {
        description: "Genome Object",
        required: true,
        content: {
          "application/json": {
            schema: {
              "$ref": "#/components/schemas/Genome"
            }
          }
        },
      },
      responses: {
        "200": {
          description: "Mutant detected",
          schema: {
            "$ref": "#/components/schemas/DataResponse"
          }
        },
        "403": {
          description: "Human detected",
          schema: {
            "$ref": "#/components/schemas/DataResponse"
          }
        },
        "400": {
          description: "Bad request",
          schema: {
            "$ref": "#/components/schemas/DataResponse"
          }
        },
        "500": {
          description: "Internal server error"
        }
      }
    }
  },
  '/genome/stats': {
    get: {
      tags: [TAG_NAME],
      summary: "Get genome stats",
      responses: {
        "200": {
          description: "OK",
          schema: {
            "$ref": "#/components/schemas/DataResponse"
          }
        },
        "204": {
          description: "No content",
          schema: {
            "$ref": "#/components/schemas/DataResponse"
          }
        },
        "500": {
          description: "Internal server error"
        }
      }
    }
  }
}

export const components = {
  schemas: {
    Genome: {
      type: "object",
      properties: {
        dna: {
          type: "array",
          required: true,
          minItems: MIN_DNA_ITEMS,
          items: {
            type: "string",
            minLength: MIN_DNA_ITEMS,
            enum: DNA_ACCEPTED
          }
        },
      }
    },
    DataResponse: {
      type: "object",
      properties: {
        status: {
          type: "integer",
          required: true,
        },
        body: {
          type: "object",
          required: true,
        },
        error: {
          type: "object",
        },
      }
    }
  }
}