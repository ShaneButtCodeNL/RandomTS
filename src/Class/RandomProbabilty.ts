import RandomWholeNumber from "./RandomWholeNumber";

//Generates a randomnumber between [0,1]
export default class RandomProbability {
  private randomA: RandomWholeNumber;
  private randomB: RandomWholeNumber;
  private precision: Number | null;

  /**
   * Creates a Random Probability Generator(RPG)
   * @param seedA A seed
   * @param seedB A different seed
   * @param precision The precision of the generated value
   */
  constructor(seedA?: number, seedB?: number, precision?: number) {
    this.precision = precision ? precision : null;
    this.randomA = seedA
      ? new RandomWholeNumber(seedA)
      : new RandomWholeNumber(Date.now() % 1234567);
    this.randomB = seedB
      ? new RandomWholeNumber(seedB)
      : new RandomWholeNumber(Date.now() % 2345678);
  }

  /**
   * Generates a value between [0,1) from the PNG. Can be Given an offset value to alter the value.
   * @param offset The offset
   * @returns A value in [0,1)
   */
  public next(offset?: number): Number {
    let randA = this.randomA.next(offset);
    let randB = this.randomB.next(offset);
    if (this.precision) {
      return randA > randB
        ? +(+randB / +randA).toFixed(+this.precision)
        : +(+randA / +randB).toFixed(+this.precision);
    }
    return randA > randB ? +randB / +randA : +randA / +randB;
  }

  /**
   * Changes the precision of the generated values.
   * @param newPrecision
   */
  public setPrecision(newPrecision: Number) {
    if (newPrecision) {
      this.precision = newPrecision;
    }
  }
}
