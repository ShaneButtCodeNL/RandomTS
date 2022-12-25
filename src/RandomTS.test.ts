import * as rand from "./RandomTS";

describe(`\n01 Flip a coin`, () => {
  it(`01 Should only return values [ "H", "T" ] `, () => {
    for (let i = 0; i < 100; i++) {
      const flip = rand.flipACoin();
      expect(["H", "T"].some((v) => v === flip)).toBe(true);
    }
  });
});
describe(`\n02 Dice Functions`, () => {
  it("01 six sided die should only roll values between [1,6]", () => {
    for (let i = 0; i < 100; i++) {
      const roll = rand.rollASixSidedDie();
      expect(roll).toBeGreaterThanOrEqual(1);
      expect(roll).toBeLessThanOrEqual(6);
    }
  });

  it("02 n sided die should only roll values between [1,n], for any value of n >= 1.test values [1 , 101]", () => {
    for (let i = 0; i < 100; i++) {
      const n = i + 1;
      const roll = rand.rollNSidedDie(n);
      expect(roll).toBeGreaterThanOrEqual(1);
      expect(roll).toBeLessThanOrEqual(n);
    }
  });
});

describe("03 Range Functions", () => {
  it("01 randomNumberInRange should generate whole number values in the range", () => {
    for (let i = 0; i < 100; i++) {
      const low = i * 2 + 1,
        high = i * 10 + 2;
      const num = rand.randomNumberInRange(low, high);
      expect(num).toBeGreaterThanOrEqual(low);
      expect(num).toBeLessThan(high);
      expect(num).toBe(Math.ceil(num));
    }
  });
  it("02 nRandomNumberInRange should return an array of values in range", () => {
    const range = rand.nRandomNumbersInRange(0, 10_000, 100);
    expect(Array.isArray(range)).toBe(true);
    expect(range.length).toBe(100);
    for (let i of range) {
      expect(i).toBeGreaterThanOrEqual(0);
      expect(i).toBeLessThan(10_000);
      expect(i).toBe(Math.ceil(i));
    }
  });
  it("03 nRandomNumberInRange with no replaces should have all unique values", () => {
    const range = rand.nRandomNumbersInRange(0, 100, 100, false);
    expect(range.length).toBe(100);
    expect(new Set(range).size).toBe(100);
  });
});

describe("04 Array Functions", () => {
  it("01 shuffleArray should return an array that contains the original values", () => {
    const origin = Array.from({ length: 100 }, (_, i) => i);
    const shuffled = rand.shuffleArray(origin);
    expect(Array.isArray(shuffled)).toBe(true);
    for (let i of shuffled) {
      expect(origin.some((v) => v === i)).toBe(true);
    }
  });
  it("02 shuffleArray should not affect the origin array", () => {
    const origin = Array.from({ length: 100 }, (_, i) => i);
    const shuffled = rand.shuffleArray(origin);
    for (let i = 0; i < 100; i++) {
      expect(origin[i]).toBe(i);
    }
  });
});
