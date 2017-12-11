import {
  CALORIES
} from './measurement';

const FREQUENCY_MULTIPLIER = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725
};

export function getTdee(exerciseFrequency, weight, height, age, sex) {
  if (!(exerciseFrequency in FREQUENCY_MULTIPLIER)) {
    throw new Error(`Unrecognized exercise frequency ${exerciseFrequency}.`);
  }

  let ree;

  if (sex === 'male') {
    ree = 10 * weight.get('kg') + 6.25 * height.get('cm') - 5 * age + 5;
  } else {
    ree = 10 * weight.get('kg') + 6.25 * height.get('cm') - 5 * age - 161;
  }

  return ree * FREQUENCY_MULTIPLIER[exerciseFrequency];
}

/* eslint-disable no-unused-vars */
function getNewTdee(tdee, type) {
  switch (type) {
    case 'loss':
      return tdee - tdee * 0.2;
    case 'gain':
      return tdee + tdee * 0.2;
    case 'maintain':
    default:
      return tdee;
  }
}

export function getMacros(tdee, weight) {
  const protein = weight.get('lb');
  const fat = (tdee * 0.25) / CALORIES.fat;
  const carbs = (tdee - (protein * CALORIES.protein + fat * CALORIES.fat)) / CALORIES.carb;

  return {
    protein: `${Math.round(protein)}g`,
    fat: `${Math.round(fat)}g`,
    carb: `${Math.round(carbs)}g`
  };
}
