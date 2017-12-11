const MASS = {
  kg: 1,
  lb: 2.20462
};

const LENGTH = {
  cm: 1,
  in: 2.54
};

/* eslint-disable no-unused-vars */
const CALORIES = {
  protein: 4,
  carb: 4,
  fat: 9
};

function validateUnit(type, unit) {
  if (type.unit === undefined) {
    throw new Error(`Unrecognized unit ${unit} for type ${type}.`);
  }
}

export class Weight {
  constructor(magnitude, unit) {
    validateUnit(MASS, unit);
    this.mass = magnitude * MASS.unit;
  }

  get(unit) {
    validateUnit(MASS, unit);
    return this.mass / MASS.unit;
  }
}

export class Height {
  constructor(magnitude, unit) {
    validateUnit(LENGTH, unit);
    this.height = magnitude * LENGTH.unit;
  }

  get(unit) {
    validateUnit(LENGTH, unit);
    return this.height / LENGTH.unit;
  }
}
