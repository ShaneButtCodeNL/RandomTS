//Uses simple Psudo random number generation to generate whole numbers
export default class RandomWholeNumber {
  //The min and max values for numbers. range [min,max)
  private max: Number;
  private min: Number | null;
  private multiplier: Number;
  private incrementor: Number;
  private modulus: Number;
  private seedCurrentValue: Number;
  private seedInitialValue: Number;

  /**
   * Creates a Random Number Generator(RNG)
   * @param seed A starting value allows for reproducable results
   * @param multiplier A value that the seed is multiplied by
   * @param incrementor A value that is added to the seed
   * @param modulus A value that applies the modulus
   * @param max The ceiling that all values must be strictly less than
   * @param min The floor that is the lowest value that can be generated
   */
  public constructor(
    seed?: Number,
    multiplier?: Number,
    incrementor?: Number,
    modulus?: Number,
    max?: Number,
    min?: Number
  ) {
    this.seedCurrentValue = seed ? seed : Date.now() * (1 / 9);
    this.multiplier = multiplier ? multiplier : 1_234_567;
    this.incrementor = incrementor ? incrementor : 123_456;
    this.modulus = modulus ? modulus : 7_654_321;
    this.max = max ? max : this.modulus;
    if (this.max >= this.modulus) this.modulus = +this.max + 1;
    this.min = min || min === 0 ? min : null;
    this.seedCurrentValue =
      Math.floor(
        +this.multiplier * +this.seedCurrentValue + +this.incrementor
      ) % +this.modulus;
    this.seedInitialValue = this.seedCurrentValue;
  }

  /**
   * Defines the ceiling for RNG that values must be strictly less then
   * @param newMaxValue The desired max value
   */
  public setMax(newMaxValue: Number) {
    if (!this.min) {
      this.min = 0;
    }
    if (newMaxValue > this.min) {
      this.max = newMaxValue;
      if (this.modulus <= newMaxValue) {
        this.modulus = +newMaxValue + 1;
      }
    }
  }

  /**
   * Defines the floor for lowest posible number to be generated
   * @param newMinValue The desired floor
   */
  public setMin(newMinValue: Number) {
    if (newMinValue < this.max) {
      this.min = newMinValue;
    }
  }

  /**
   * Updates the range for RNG. Sets range as [min, max)
   * @param newMinValue The desired min
   * @param newMaxValue The desired max
   */
  public setMinMax(newMinValue: Number, newMaxValue: Number) {
    if (newMaxValue > newMinValue) {
      this.min = newMinValue;
      this.max = newMaxValue;
      if (this.modulus <= newMaxValue) this.modulus = +newMaxValue + 1;
    }
  }

  /**
   * Generates the next number from the RNG. It can be given an optional offset value.
   * @param offset The offset
   * @returns A number in the range [min,max)
   */
  public next(offset?: Number) {
    this.seedCurrentValue =
      Math.floor(
        +this.multiplier * +this.seedCurrentValue +
          (offset
            ? Math.floor(
                (+offset + +this.seedCurrentValue) / +this.seedCurrentValue
              )
            : 0) +
          +this.incrementor
      ) % +this.modulus;
    return this.min !== null
      ? +this.min + (+this.seedCurrentValue % (+this.max - +this.min))
      : this.seedCurrentValue;
  }

  /**
   * Resets the RNG to initail state
   */
  public reset() {
    this.seedCurrentValue = this.seedInitialValue;
  }
}
