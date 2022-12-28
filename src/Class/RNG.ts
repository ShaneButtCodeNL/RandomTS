const mask32Bit: number = 2 ** 32 - 1;
/**
 * Generates random values based on the "Linear Congruential Model".
 */
export class LCG {
  private seed: number;
  private incrementor: number;
  private multiplicator: number;
  private mod: number;
  private seedInitial: number;
  constructor(
    seed: number,
    incrementor: number,
    multiplicator: number,
    mod: number
  ) {
    if (mod <= 0)
      throw new Error(`Error\n"mod" must be greater than 0. Got " ${mod} "`);
    if (seed < 0)
      throw new Error(`Error\n"seed" cannot be negative. Got " ${seed} "`);
    if (incrementor >= mod || incrementor < 0)
      throw new Error(
        `Error\n"incrementor" must be less than mod and greater than or equal to 0. Got " ${incrementor} "`
      );
    if (multiplicator <= 0 || multiplicator >= mod)
      throw new Error(
        `Error\n"multiplicator" must be grater than 0 and less than mod. Got " ${multiplicator} ".`
      );
    this.mod = mod;
    this.seed = seed % mod;
    this.incrementor = incrementor;
    this.multiplicator = multiplicator;
    this.seedInitial = seed % mod;
  }

  public reset() {
    this.seed = this.seedInitial;
  }

  public next(offset?: number, bitsSection?: Array<number>) {
    this.seed =
      (this.seed * this.multiplicator + this.incrementor + (offset || 0)) %
      this.mod;
    if (bitsSection) {
      if (bitsSection.length === 1) {
        if (bitsSection[0] < 0)
          throw new Error(
            `Error:"bitsSection values must be greater than 0. Got ${bitsSection}"`
          );
        const bits = 2 ** bitsSection[0] - 1;
        return this.seed & bits;
      }
      if (bitsSection.length === 2) {
        if (bitsSection[0] < 0 || bitsSection[1] < 0)
          throw new Error(
            `Error:"bitsSection" must be greater then 0. Got ${bitsSection}`
          );
        //Ensure bigger number is in pos 1
        if (bitsSection[0] > bitsSection[1])
          bitsSection = [bitsSection[1], bitsSection[0]];
        const bits = 2 ** bitsSection[1] - 1 - (2 ** bitsSection[0] - 1);
        return this.seed & bits;
      }
      throw new Error(
        `Error\n"bits" must have a length of 1 or 2. Got length:${bitsSection.length}`
      );
    }
    return this.seed;
  }
}

export class XORShift32Bit {
  private seed: number;
  private seedInitial: number;
  private shift1: number;
  private shift2: number;
  private shift3: number;
  constructor(
    seed = Date.now() & mask32Bit,
    shift1 = 13,
    shift2 = 17,
    shift3 = 5
  ) {
    this.seed = seed;
    this.seedInitial = seed;
    this.shift1 = shift1;
    this.shift2 = shift2;
    this.shift3 = shift3;
  }
  public next() {
    this.seed ^= this.seed << this.shift1;
    this.seed ^= this.seed >> this.shift2;
    this.seed ^= this.seed << this.shift3;
    return this.seed;
  }
  public reset() {
    this.seed = this.seedInitial;
  }
  public static getShifts = () => [
    [1, 3, 10],
    [1, 5, 16],
    [1, 5, 19],
    [1, 9, 29],
    [1, 11, 6],
    [1, 11, 16],
    [1, 19, 3],
    [1, 21, 20],
    [1, 27, 27],
    [2, 5, 15],
    [2, 5, 21],
    [2, 7, 7],
    [2, 7, 9],
    [2, 7, 25],
    [2, 9, 15],
    [2, 15, 17],
    [2, 15, 25],
    [2, 21, 9],
    [3, 1, 14],
    [3, 3, 26],
    [3, 3, 28],
    [3, 3, 29],
    [3, 5, 20],
    [3, 5, 22],
    [3, 5, 25],
    [3, 7, 29],
    [3, 13, 7],
    [3, 23, 25],
    [3, 25, 24],
    [3, 27, 11],
    [4, 3, 17],
    [4, 3, 27],
    [4, 5, 15],
    [5, 3, 21],
    [5, 7, 22],
    [5, 9, 7],
    [5, 9, 28],
    [5, 9, 31],
    [5, 13, 6],
    [5, 15, 17],
    [5, 17, 13],
    [5, 21, 12],
    [5, 27, 8],
    [5, 27, 21],
    [5, 27, 25],
    [5, 27, 28],
    [6, 1, 11],
    [6, 3, 17],
    [6, 17, 9],
    [6, 21, 7],
    [6, 21, 13],
    [7, 1, 9],
    [7, 1, 18],
    [7, 1, 25],
    [7, 13, 25],
    [7, 17, 21],
    [7, 25, 12],
    [7, 25, 20],
    [8, 7, 23],
    [8, 9, 23],
    [9, 5, 1],
    [9, 5, 25],
    [9, 11, 19],
    [9, 21, 16],
    [10, 9, 21],
    [10, 9, 25],
    [11, 7, 12],
    [11, 7, 16],
    [11, 17, 13],
    [11, 21, 13],
    [12, 9, 23],
    [13, 3, 17],
    [13, 3, 27],
    [13, 5, 19],
    [13, 17, 15],
    [14, 1, 15],
    [14, 13, 15],
    [15, 1, 29],
    [17, 15, 20],
    [17, 15, 23],
    [17, 15, 26],
  ];
}
export const makeRtlUniform = (seed?: number) => {
  return new LCG(
    seed || Date.now(),
    2_147_483_587,
    2_147_483_629,
    2_147_483_647
  );
};
