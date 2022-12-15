import RandomWholeNumber from "./Class/RandomWholeNumber";
import RandomProbability from "./Class/RandomProbabilty";

/**
 * Gets a random number between [0,1]
 * @param precision The max number of decimal places
 * @returns a number in range [0,1]
 */
export const random = (precision?: number) => {
  const rng = new RandomProbability();
  if (precision) rng.setPrecision(precision);
  return rng.next();
};

/**
 * Gets a 50/50 odds
 * @returns 0 or 1
 */
export const flipACoin = () => {
  const rng = new RandomWholeNumber();
  rng.setMinMax(0, 2);
  return rng.next();
};

/**
 * Rearranges an arrays values and returns the array
 * @param array An array of values
 * @returns The array but the values have been shuffled
 */
export const shuffleArray = (array: Array<any>) => {
  const rng = new RandomProbability();
  const shuffledArray = array
    .map((v) => [v, rng.next()])
    .sort((a, b) => a[1] - b[1])
    .map((v) => v[0]);
  return shuffledArray;
};

/**
 * Rearanges the values of an array and alters the original array
 * @param array an array of values
 */
export const shuffleArrayInPlace = (array: Array<any>) => {
  const shuffledArray = shuffleArray(array);
  for (let i = 0; i < array.length; i++) array[i] = shuffledArray[i];
};

export const randomNumberInRange = (lowerLimit: number, upperLimit: number) => {
  if (lowerLimit >= upperLimit)
    throw new Error(
      `Error: lowerLimit must be lower than upperLimit.\n\tlowerLimit : ${lowerLimit}\n\tupperLimit : ${upperLimit}`
    );
  const rng = new RandomWholeNumber();
  rng.setMinMax(lowerLimit, upperLimit);
  return rng.next();
};
