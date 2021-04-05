import faker from 'faker';

export async function generateGenomeCode() {
  return await faker.random.alphaNumeric();
}