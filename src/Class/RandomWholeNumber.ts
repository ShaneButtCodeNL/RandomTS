//Uses simple Psudo random number generation to generate whole numbers

import { XORShift32Bit } from "./RNG";

export default class RandomWholeNumber {
  //The min and max values for numbers. range [min,max)
  private max: number;
  private min: number;
  private RandomNumberGenerator: XORShift32Bit;

  /**
   * Creates a Random Number Generator(RNG)
   * @param seed A starting value allows for reproducable results
   * @param max The ceiling that all values must be strictly less than
   * @param min The floor that is the lowest value that can be generated
   */
  public constructor(seed?: number, max = 100, min = 0) {
    this.RandomNumberGenerator = seed
      ? new XORShift32Bit(seed)
      : new XORShift32Bit();
    if (max <= min)
      throw new Error(
        `Error\n"min" must be less than "max". Found [ min : ${min} ] and [ max : ${max}].`
      );
    this.max = max;
    this.min = min;
  }

  /**
   * Defines the ceiling for RNG that values must be strictly less then
   * @param newMaxValue The desired max value
   */
  public setMax(newMaxValue: number) {
    if (newMaxValue <= this.min)
      throw new Error(
        `Error\n"min" must be less than "max". Found [ min : ${this.min} ] and [ max : ${newMaxValue}].`
      );
    this.max = newMaxValue;
  }

  /**
   * Defines the floor for lowest posible number to be generated
   * @param newMinValue The desired floor
   */
  public setMin(newMinValue: number) {
    if (newMinValue >= this.max)
      throw new Error(
        `Error\n"min" must be less than "max". Found [ min : ${newMinValue} ] and [ max : ${this.max}].`
      );
    this.min = newMinValue;
  }

  /**
   * Updates the range for RNG. Sets range as [min, max)
   * @param newMinValue The desired min
   * @param newMaxValue The desired max
   */
  public setMinMax(newMinValue: number, newMaxValue: number) {
    if (newMaxValue <= newMinValue)
      throw new Error(
        `Error\n"min" must be less than "max". Found [ min : ${newMinValue} ] and [ max : ${newMaxValue}].`
      );
    this.max = newMaxValue;
    this.min = newMinValue;
  }

  /**
   * Generates the next number from the RNG. It can be given an optional offset value.
   * @param offset The offset
   * @returns A number in the range [min,max)
   */
  public next(offset = 0) {
    const range = this.max - this.min;
    return (
      this.min + (Math.abs(this.RandomNumberGenerator.next(offset)) % range)
    );
  }

  public nextInRange(min: number, max: number, offset = 0) {
    if (min >= max)
      throw new Error(
        `Error\n"min" must be less than "max". Found [ min : ${min} ] and [ max : ${max}].`
      );
    const range = max - min;
    return min + (Math.abs(this.RandomNumberGenerator.next(offset)) % range);
  }

  /**
   * Resets the RNG to initail state
   */
  public reset() {
    this.RandomNumberGenerator.reset();
  }
}
