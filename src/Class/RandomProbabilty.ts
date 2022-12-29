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
   */
  constructor(seedA?: number, seedB?: number, precision = 1) {
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
   * Generates a number value in the range of [0,1). Can be given an offset to alter the value.
   * @param offset The offset
   * @returns A number value between [0,1)
   */
  public nextValue(offset = 0) {
    return parseFloat(this.next(offset));
  }

  /**
   * Changes the precision of the generated values. Precision must be greater than 0.
   * @param newPrecision
   */
  public setPrecision(newPrecision: number) {
    if (newPrecision <= 0)
      throw new Error(
        `ERROR\n"newPrecision must be larger than 0. Got [ ${newPrecision} ]`
      );

    this.precision = newPrecision;
  }
}
