import RandomWholeNumber from "./Class/RandomWholeNumber";
import RandomProbability from "./Class/RandomProbabilty";

const DEFAULTPRECISION = 3;

const mask16Bit = 2 ** 16 - 1;
const masterSeed = Date.now() & mask16Bit;
const masterSeed2 = (Date.now() >> 2) & mask16Bit;
const masterWholeNumberGenerator = new RandomWholeNumber(masterSeed);
const masterRandomProbabilityGenerator = new RandomProbability(
  masterSeed,
  masterSeed2,
  DEFAULTPRECISION
);

//Export RNGs
export { RandomProbability, RandomWholeNumber };

/**
 * Gets a random number between [0,1]
 * @param precision The max number of decimal places
 * @returns a number in range [0,1]
 */
export const random = (
  precision?: number,
  seedA?: number,
  seedB?: number
): number => {
  const rng = seedA
    ? new RandomProbability(seedA, seedB || masterSeed2)
    : masterRandomProbabilityGenerator;
  return rng.nextValuePrecision(precision || DEFAULTPRECISION);
};

/**
 * Simulates a coin flip
 * @returns "H" if heads, "T" if tails
 */
export const flipACoin = (seed?: number): string => {
  const flip = (
    seed
      ? new RandomWholeNumber(seed).nextInRange(0, 2)
      : masterWholeNumberGenerator.nextInRange(0, 2)
  )
    ? "H"
    : "T";

  return flip;
};

/**
 * Simulates rolling a six sided die
 * @returns a value between [1,6]
 */
export const rollASixSidedDie = (seed?: number): number => {
  return seed
    ? new RandomWholeNumber(seed).nextInRange(1, 7)
    : masterWholeNumberGenerator.nextInRange(1, 7);
};

/**
 * Simulates rolling a n sided die.
 * @param n The number of sides on the die
 * @returns a value between [1,n]
 */
export const rollNSidedDie = (n: number, seed?: number): number => {
  return seed
    ? new RandomWholeNumber(seed).nextInRange(1, n + 1)
    : masterWholeNumberGenerator.nextInRange(1, n + 1);
};

/**
 * Rearranges an arrays values and returns the array
 * @param array An array of values
 * @returns The array but the values have been shuffled
 */
export const shuffleArray = (
  array: Array<any>,
  seedA?: number,
  seedB?: number
): Array<any> => {
  const rng = seedA
    ? new RandomProbability(seedA, seedB || masterSeed2)
    : masterRandomProbabilityGenerator;
  const shuffledArray = array
    .map((v) => [v, rng.nextValue()])
    .sort((a, b) => a[1] - b[1])
    .map((v) => v[0]);
  return shuffledArray;
};

/**
 * Rearanges the values of an array and alters the original array
 * @param array an array of values
 * @deprecated Please use [shuffleArray] to not mutate the original array.
 */
export const shuffleArrayInPlace = (array: Array<any>, seed?: number): void => {
  const shuffledArray = shuffleArray(array);
  for (let i = 0; i < array.length; i++) array[i] = shuffledArray[i];
};

/**
 * Gets a random value from an array
 * @param array The array of values
 * @returns The random selected value
 */
export const pickRandomFromArray = (array: Array<any>, seed?: number): any => {
  const rng = seed ? new RandomWholeNumber(seed) : masterWholeNumberGenerator;
  return array[rng.nextInRange(0, array.length)];
};

/**
 * Gets n random values from the array. If replace is set to false or not declared the values will not be replaced so n cannot exceed the length of the array. This copies the array so it will not mutate the original array.
 * @param array The array of values
 * @param n The number of values to be generated
 * @param replace Will values be returned to the collection after draw.
 * @returns an array of randomly drawn values
 */
export const pickNRandomFromArray = (
  array: Array<any>,
  n: number,
  replace = false,
  seed?: number
): Array<any> => {
  if (n <= 0 || (!replace && n > array.length))
    throw new Error(
      `Error : Value of n must be in range [1, ${array.length}]. Found n=${n}.`
    );
  const returnArray: Array<any> = [];
  const copyArray = [...array];
  const rng = seed ? new RandomWholeNumber(seed) : masterWholeNumberGenerator;
  let getArrayValue = replace
    ? () => returnArray.push(copyArray[rng.nextInRange(0, copyArray.length)])
    : () => {
        returnArray.push(
          copyArray.splice(rng.nextInRange(0, copyArray.length), 1)[0]
        );
      };
  for (let i = 0; i < n; i++) getArrayValue();
  return returnArray;
};

/**
 * Generate a random value in a range of values
 * @param lowerLimit The lowest number that can be generated
 * @param upperLimit The upper bound that all values must be lower than. Cannot be generated.
 * @returns a value in range of [lowerLimit, upperLimit)
 */
export const randomNumberInRange = (
  lowerLimit: number,
  upperLimit: number,
  seed?: number
): number => {
  if (lowerLimit >= upperLimit)
    throw new Error(
      `Error: lowerLimit must be lower than upperLimit.\n\tlowerLimit : ${lowerLimit}\n\tupperLimit : ${upperLimit}`
    );
  const rng = seed ? new RandomWholeNumber(seed) : masterWholeNumberGenerator;
  return rng.nextInRange(lowerLimit, upperLimit);
};

/**
 * Generates n values from a range of values.
 * @param lowerLimit The lowest value in the range of values
 * @param upperLimit The upper bound for the range of values. All Values are Lower than this bound. This value will not be generated.
 * @param n The number of values to be generated. If NOT replacing this value must be smaller than number of values in the range.
 * @param replace Will values be replaced after being drawn. Defaults to false.
 * @returns An array of values.
 */
export const nRandomNumbersInRange = (
  lowerLimit: number,
  upperLimit: number,
  n: number,
  replace = false,
  seed?: number
): Array<number> => {
  //If lower limit is greater than upperLimit throw error
  if (lowerLimit >= upperLimit)
    throw new Error(
      `Error: lowerLimit must be lower than upperLimit.\n\tlowerLimit : ${lowerLimit}\n\tupperLimit : ${upperLimit}`
    );

  let length = Math.abs(lowerLimit - upperLimit);
  //If n is <= 0 or if greater than number of values in range when not replacing throw error
  if (n <= 0 || (!replace && n > length))
    throw new Error(
      `Error : Value of n must be in range [1, ${length}]. Found n=${n}.`
    );

  const returnArray: Array<number> = [];
  const rng = seed ? new RandomWholeNumber(seed) : masterWholeNumberGenerator;
  if (!replace) {
    //An array of range
    const array = Array.from({ length: length }, (_, i) => lowerLimit + i);
    return shuffleArray(array).slice(0, n);
  }
  for (let i = 0; i < n; i++)
    returnArray.push(rng.nextInRange(lowerLimit, upperLimit));
  return returnArray;
};
