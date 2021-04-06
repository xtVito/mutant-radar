import joi from "joi";

import { DNA_ACCEPTED } from '../../../config/constants';

export const GenomeSchema = joi.object().keys({
  dna: joi.array().items(
    joi.string()
      .required()
      .custom((value, helper) => {
        let accepted = DNA_ACCEPTED;
        let val = [...value];

        // Evaluate the array contains only the accepted letters
        for (var i = 0; i < val.length; i++) {
          if (!accepted.includes(val[i].toUpperCase())) {
            return helper.message({ "custom": `"dna" only accepts following letters '${DNA_ACCEPTED.join(',')}'` });
          }
        }

        return value.toUpperCase();
      })
  ).min(4)
    .required()
    .custom((value, helper) => {
      let size = value.length;

      // Evaluate the array is a NxN size
      for (var i = 0; i < size; i++) {
        if (size !== value[i].length) {
          return helper.message({ "custom": `"dna" matrix size must be NxN` });
        }
      }

      return value;
    })
});