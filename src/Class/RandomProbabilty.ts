import RandomWholeNumber from "./RandomWholeNumber";
const mask16Bit = 2 ** 16 - 1;
//Generates a randomnumber between [0,1]
export default class RandomProbability {
  private randomA: RandomWholeNumber;
  private randomB: RandomWholeNumber;
  private precision: number;

  /**
   * Creates a Random Probability Generator(RPG)
   * @param seedA A seed
   * @param seedB A different seed
   * @param precision The precision of the generated value
   * @throws Error [precision] <=0
   */
  constructor(seedA?: number, seedB?: number, precision = 2) {
    if (precision < 1)
      throw new Error(
        `Error\n"precision" must be grater than 0. Found ${precision}`
      );
    this.precision = precision;
    this.randomA = seedA
      ? new RandomWholeNumber(seedA)
      : new RandomWholeNumber((Date.now() >> 2) & mask16Bit);
    this.randomB = seedB
      ? new RandomWholeNumber(seedB)
      : new RandomWholeNumber((Date.now() >> 3) ^ mask16Bit);
  }

  /**
   * Generates a string value between [0,1) from the PNG. Can be Given an offset value to alter the value.
   * @param offset The offset
   * @returns A string value in [0,1)
   */
  public next(offset = 0): string {
    //Add one to prevent divide by zero error
    let randA = this.randomA.next(offset);
    let randB = this.randomB.next(offset);
    return randA > randB
      ? (randB / (randA + 1)).toFixed(this.precision)
      : (randA / (randB + 1)).toFixed(this.precision);
  }

  /**
   * Generates a string value between [0,1) with "precision" decimal places. Can be Given an offset value to alter the value.
   * @param precision The number of decimal places required. Must be greater than 0.
   * @param offset The offset
   * @returns {string} A string in range [0,1)
   * @throws Error [precision] <=0
   *
   */
  public nextPrecision(precision: number, offset = 0): string {
    if (precision <= 0)
      throw new Error(
        `Error\n"precision" must be grater than 0. Found ${precision}`
      );
    let randA = this.randomA.next(offset);
    let randB = this.randomB.next(offset);
    return randA > randB
      ? (randB / (randA + 1)).toFixed(precision)
      : (randA / (randB + 1)).toFixed(precision);
  }

  /**
   * Generates a number value in the range of [0,1). Can be given an offset to alter the value.
   * @param offset The offset
   * @returns A number value between [0,1)
   */
  public nextValue(offset = 0) {
    return parseFloat(this.next(offset));
  }

  /**
   * Generates a number value in the range of [0,1) with "precision" number of decimals.
   * Given the nature of numbers, result may have fewer decimal places if there are trailing zeroes.
   * Can be given an offset to alter the value.
   * @param precision The number of decimal places
   * @param offset The offset
   * @returns a number between [0,1)
   * @throws Error [precision] <=0
   *
   */
  public nextValuePrecision(precision: number, offset = 0): number {
    if (precision <= 0)
      throw new Error(
        `Error\n"precision" must be grater than 0. found ${precision}`
      );
    return parseFloat(this.nextPrecision(precision, offset));
  }

  /**
   * Changes the precision of the generated values. Precision must be greater than 0.
   * @param newPrecision
   * @throws Error [precision] <=0
   *
   * @deprecated Since version 1.1.1. Please use 'nextPrecision' and 'nextValuePrecision' to alter the precision of calls.
   */
  public setPrecision(newPrecision: number) {
    if (newPrecision <= 0)
      throw new Error(
        `ERROR\n"newPrecision must be larger than 0. Got [ ${newPrecision} ]`
      );

    this.precision = newPrecision;
  }

  /**
   * Resets the Random number generators to initial state.
   */
  public reset() {
    this.randomA.reset();
    this.randomB.reset();
  }
}
